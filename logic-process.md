Of course. Let's walk through the backend logic for the entire order lifecycle: from a customer placing an order, to a store manager processing it, and finally, a driver delivering it.

This process involves three different users (roles) interacting with different API endpoints, with the database acting as the central state machine.

---

### **High-Level Workflow**

1.  **Customer:** Sends a `POST` request to `/api/orders`. This creates a new order with a `pending` status.
2.  **Store Manager:** Fetches pending orders via `GET /api/manager/orders`. They then accept the order by sending a `PUT` request to `/api/manager/orders/:id`, changing the order's status to `preparing`. This action also creates a corresponding entry in the `deliveries` table for drivers to see.
3.  **Driver:** Fetches available delivery tasks via `GET /api/driver/requests`. They accept a task by sending a `PUT` request to `/api/driver/tasks/:id` (where `:id` is the *delivery* ID).
4.  **Driver:** Updates the delivery progress (e.g., "in_transit", "delivered") by sending `PUT` requests to `/api/driver/tasks/:id/status`. This also updates the main order's status.

---

### **Phase 1: Customer Places an Order**

The customer has items in their cart and proceeds to checkout.

**API Call:**
*   **Method:** `POST`
*   **Endpoint:** `/api/orders`
*   **Auth:** `Bearer <customer_jwt_token>`
*   **Body:**
    ```json
    {
      "store_id": 12,
      "payment_method": "Credit Card"
    }
    ```

#### **Backend Logic (Controller & Model)**

This is a critical operation that needs to be atomic. If any step fails (e.g., checking stock, creating the order), the whole process should be rolled back. We will use a **database transaction**.

**File: `src/api/controllers/customer.controller.js`**
```javascript
const pool = require('../../config/db.config');

// @desc    Place a new order from the cart
// @route   POST /api/orders
exports.placeOrder = async (req, res) => {
  const userId = req.user.id; // From 'protect' middleware
  const { store_id, payment_method } = req.body;

  let connection; // Declare connection outside try block for access in catch/finally

  try {
    // 1. Start a transaction
    connection = await pool.getConnection();
    await connection.beginTransaction();
    
    // 2. Get all items from the user's cart
    const [cartItems] = await connection.query(
      `SELECT ci.product_id, ci.quantity, p.price, p.store_id 
       FROM cart_items ci 
       JOIN carts c ON ci.cart_id = c.id
       JOIN products p ON ci.product_id = p.id
       WHERE c.user_id = ?`,
      [userId]
    );

    if (cartItems.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Ensure all items are from the same store provided in the body
    if (cartItems.some(item => item.store_id !== store_id)) {
        await connection.rollback();
        connection.release();
        return res.status(400).json({ message: 'All cart items must be from the same store.' });
    }

    // 3. Calculate total amount
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // 4. Create the main order record
    const [orderResult] = await connection.query(
      'INSERT INTO orders (user_id, store_id, total_amount, payment_method, payment_status, status) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, store_id, totalAmount, payment_method, 'paid', 'pending'] // Assuming payment is processed here
    );
    const orderId = orderResult.insertId;

    // 5. Create order_items records from cart items
    const orderItemsValues = cartItems.map(item => [orderId, item.product_id, item.quantity, item.price]);
    await connection.query(
      'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?',
      [orderItemsValues]
    );

    // 6. Clear the user's cart
    // Get cart ID first
    const [cart] = await connection.query('SELECT id FROM carts WHERE user_id = ?', [userId]);
    if (cart.length > 0) {
        await connection.query('DELETE FROM cart_items WHERE cart_id = ?', [cart[0].id]);
    }

    // 7. Commit the transaction
    await connection.commit();
    
    res.status(201).json({ 
        message: 'Order placed successfully!', 
        orderId: orderId 
    });

  } catch (error) {
    // If anything fails, roll back all database changes
    if (connection) await connection.rollback();
    console.error("Order placement error:", error);
    res.status(500).json({ message: 'Server error during order placement.' });
  } finally {
    // Always release the connection back to the pool
    if (connection) connection.release();
  }
};
```

**Database State After Phase 1:**
*   **`orders` table:** A new row is added with `status: 'pending'`, `payment_status: 'paid'`.
*   **`order_items` table:** Rows for each product in the order are added, linked to the new `order_id`.
*   **`cart_items` table:** The customer's cart items are deleted.

---

### **Phase 2: Store Manager Processes the Order**

The store manager logs in and sees the new order. They decide to accept it.

**API Call:**
*   **Method:** `PUT`
*   **Endpoint:** `/api/manager/orders/1` (where `1` is the new `orderId`)
*   **Auth:** `Bearer <manager_jwt_token>`
*   **Body:**
    ```json
    {
      "status": "preparing"
    }
    ```

#### **Backend Logic (Controller)**

This action updates the order and creates the delivery task.

**File: `src/api/controllers/storeManager.controller.js`**
```javascript
const pool = require('../../config/db.config');

// @desc    Accept/Reject or update order status
// @route   PUT /api/manager/orders/:id
exports.updateOrderStatus = async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body; // Can be 'preparing', 'cancelled', etc.
  const managerId = req.user.id; // From 'protect' middleware

  // Ensure this manager can only manage orders for their store
  const [order] = await pool.query(
    `SELECT o.id, s.manager_id FROM orders o 
     JOIN stores s ON o.store_id = s.id 
     WHERE o.id = ?`, [orderId]
    );

  if (order.length === 0 || order[0].manager_id !== managerId) {
    return res.status(403).json({ message: 'Forbidden: You cannot manage this order.' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Update the order status
    await connection.query(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, orderId]
    );

    // 2. If the order is accepted ('preparing'), create a delivery task for drivers
    if (status === 'preparing') {
      await connection.query(
        `INSERT INTO deliveries (order_id, delivery_status) VALUES (?, ?)`,
        [orderId, 'assigned'] // 'assigned' means it's available for drivers to pick up
      );
    }
    
    await connection.commit();

    // In a real app, you would emit a notification here to the customer.
    // e.g., notificationService.notifyUser(order.user_id, 'Your order is being prepared!');

    res.json({ message: `Order ${orderId} status updated to ${status}. Delivery task created.` });

  } catch (error) {
    if (connection) await connection.rollback();
    console.error(error);
    res.status(500).json({ message: 'Server error while updating order status.' });
  } finally {
    if (connection) connection.release();
  }
};
```

**Database State After Phase 2:**
*   **`orders` table:** The order's `status` is now `'preparing'`.
*   **`deliveries` table:** A new row is created, linking `order_id` to a new delivery record. The `driver_id` is `NULL`, and `delivery_status` is `'assigned'`.

---

### **Phase 3: Driver Delivers the Order**

The driver accepts the task and updates its status until completion.

#### **3A: Driver Accepts the Delivery Task**

**API Call:**
*   **Method:** `PUT`
*   **Endpoint:** `/api/driver/tasks/1` (where `1` is the *delivery* ID, not the order ID)
*   **Auth:** `Bearer <driver_jwt_token>`
*   **Body:**
    ```json
    {
      "action": "accept"
    }
    ```

**Backend Logic (Controller):**
**File: `src/api/controllers/driver.controller.js`**
```javascript
const pool = require('../../config/db.config');

// @desc    Accept or reject a delivery task
// @route   PUT /api/driver/tasks/:id
exports.acceptOrRejectDelivery = async (req, res) => {
    const deliveryId = req.params.id;
    const driverId = req.user.id;
    const { action } = req.body; // "accept"

    if (action !== 'accept') {
        return res.status(400).json({ message: 'Invalid action.' });
    }

    // 1. Atomically assign the driver to the delivery task
    // The WHERE clause ensures that two drivers cannot accept the same task simultaneously
    const [result] = await pool.query(
        `UPDATE deliveries SET driver_id = ?, delivery_status = 'in_transit' WHERE id = ? AND driver_id IS NULL`,
        [driverId, deliveryId]
    );

    if (result.affectedRows === 0) {
        return res.status(409).json({ message: 'Delivery was already taken or does not exist.' });
    }

    // 2. Update the main order's status to 'out_for_delivery'
    const [delivery] = await pool.query('SELECT order_id FROM deliveries WHERE id = ?', [deliveryId]);
    const orderId = delivery[0].order_id;
    await pool.query(`UPDATE orders SET status = 'out_for_delivery' WHERE id = ?`, [orderId]);
    
    // Notify customer and store manager
    res.json({ message: 'Delivery accepted. Order is now out for delivery.' });
};
```

#### **3B: Driver Marks the Order as Delivered**

**API Call:**
*   **Method:** `PUT`
*   **Endpoint:** `/api/driver/tasks/1/status`
*   **Auth:** `Bearer <driver_jwt_token>`
*   **Body:**
    ```json
    {
      "status": "delivered"
    }
    ```

**Backend Logic (Controller):**
**File: `src/api/controllers/driver.controller.js`**
```javascript
// @desc    Update delivery status (e.g., mark as delivered)
// @route   PUT /api/driver/tasks/:id/status
exports.updateDeliveryStatus = async (req, res) => {
    const deliveryId = req.params.id;
    const driverId = req.user.id;
    const { status } = req.body; // "delivered"

    if (status !== 'delivered') {
        return res.status(400).json({ message: 'Invalid status update.' });
    }

    // 1. Update the delivery record
    const [deliveryUpdateResult] = await pool.query(
        `UPDATE deliveries SET delivery_status = ?, delivery_time = NOW() WHERE id = ? AND driver_id = ?`,
        [status, deliveryId, driverId]
    );

    if (deliveryUpdateResult.affectedRows === 0) {
        return res.status(403).json({ message: 'Cannot update this delivery. It may not be assigned to you.' });
    }

    // 2. Update the main order status to 'delivered'
    const [delivery] = await pool.query('SELECT order_id FROM deliveries WHERE id = ?', [deliveryId]);
    const orderId = delivery[0].order_id;
    await pool.query(`UPDATE orders SET status = 'delivered' WHERE id = ?`, [orderId]);

    // Notify customer
    res.json({ message: 'Order has been successfully delivered!' });
};
```

**Database State After Phase 3:**
*   **`orders` table:** The order's `status` is now `'delivered'`.
*   **`deliveries` table:** The `driver_id` is set, `delivery_status` is `'delivered'`, and `delivery_time` is populated.

The entire lifecycle is now complete, with each step being an authenticated, authorized, and atomic operation that correctly updates the state of the system in the database.