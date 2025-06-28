## **KWAMHLANGA-EATS SYSTEM – API ENDPOINT DESIGN**

---

### 👤 **Auth (Shared by All Users)**

| Method | Endpoint        | Description                 | Auth Required |
| ------ | --------------- | --------------------------- | ------------- |
| POST   | `/api/register` | Register user               | ❌             |
| POST   | `/api/login`    | Login user + get JWT token  | ❌             |
| GET    | `/api/profile`  | View logged-in user profile | ✅             |
| PUT    | `/api/profile`  | Update profile info         | ✅             |

---

### 🛒 **Customer APIs**

| Method | Endpoint                   | Description                | Auth |
| ------ | -------------------------- | -------------------------- | ---- |
| GET    | `/api/stores`              | Browse stores              | ❌    |
| GET    | `/api/stores/:id/products` | View products from a store | ❌    |
| POST   | `/api/cart`                | Add item to cart           | ✅    |
| GET    | `/api/cart`                | View cart                  | ✅    |
| PUT    | `/api/cart/:itemId`        | Update cart item quantity  | ✅    |
| DELETE | `/api/cart/:itemId`        | Remove item from cart      | ✅    |
| POST   | `/api/orders`              | Place order                | ✅    |
| GET    | `/api/orders`              | View order history         | ✅    |
| GET    | `/api/orders/:id/track`    | Track order                | ✅    |

---

### 🏪 **Store Manager APIs**

| Method | Endpoint                    | Description                        | Auth |
| ------ | --------------------------- | ---------------------------------- | ---- |
| GET    | `/api/manager/products`     | List all store products            | ✅    |
| POST   | `/api/manager/products`     | Add new product                    | ✅    |
| PUT    | `/api/manager/products/:id` | Edit product                       | ✅    |
| DELETE | `/api/manager/products/:id` | Remove product                     | ✅    |
| GET    | `/api/manager/orders`       | View incoming orders               | ✅    |
| PUT    | `/api/manager/orders/:id`   | Accept/Reject/Set preparation time | ✅    |
| GET    | `/api/manager/reports`      | View sales reports                 | ✅    |

---

### 🚚 **Driver APIs**

| Method | Endpoint                       | Description                  | Auth |
| ------ | ------------------------------ | ---------------------------- | ---- |
| GET    | `/api/driver/requests`         | View delivery requests       | ✅    |
| PUT    | `/api/driver/tasks/:id`        | Accept or reject delivery    | ✅    |
| GET    | `/api/driver/tasks`            | View assigned deliveries     | ✅    |
| PUT    | `/api/driver/tasks/:id/status` | Mark delivery as "delivered" | ✅    |

---

### 🛠️ **Admin APIs**

| Method | Endpoint                | Description                  | Auth |
| ------ | ----------------------- | ---------------------------- | ---- |
| GET    | `/api/admin/users`      | List all users               | ✅    |
| PUT    | `/api/admin/users/:id`  | Update user info/role/status | ✅    |
| DELETE | `/api/admin/users/:id`  | Delete user                  | ✅    |
| POST   | `/api/admin/stores`     | Add a store                  | ✅    |
| PUT    | `/api/admin/stores/:id` | Edit store info              | ✅    |
| DELETE | `/api/admin/stores/:id` | Remove a store               | ✅    |
| GET    | `/api/admin/reports`    | View system-wide performance | ✅    |
| GET    | `/api/admin/support`    | View support tickets         | ✅    |

---
## **KWAMHLANGA-EATS SYSTEM  – Database Schema (MySQL)**

---

### 🧍‍♂️ `users`

Handles all types: customer, manager, driver, admin

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role ENUM('customer', 'manager', 'driver', 'admin') NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

### 🏬 `stores`

```sql
CREATE TABLE stores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  hours VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  manager_id INT,
  FOREIGN KEY (manager_id) REFERENCES users(id)
);
```

---

### 🍔 `products`

```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  store_id INT,
  name VARCHAR(100),
  description TEXT,
  price DECIMAL(10, 2),
  image_url VARCHAR(255),
  stock_quantity INT DEFAULT 0,
  is_available BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (store_id) REFERENCES stores(id)
);
```

---

### 🛒 `carts` & `cart_items`

```sql
CREATE TABLE carts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cart_id INT,
  product_id INT,
  quantity INT,
  FOREIGN KEY (cart_id) REFERENCES carts(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

---

### 📦 `orders` & `order_items`

```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  store_id INT,
  total_amount DECIMAL(10, 2),
  status ENUM('pending', 'preparing', 'out_for_delivery', 'delivered', 'cancelled') DEFAULT 'pending',
  payment_status ENUM('paid', 'pending', 'failed') DEFAULT 'pending',
  payment_method VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  product_id INT,
  quantity INT,
  price DECIMAL(10, 2),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

---

### 🚚 `deliveries`

```sql
CREATE TABLE deliveries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  driver_id INT,
  delivery_status ENUM('assigned', 'in_transit', 'delivered', 'failed') DEFAULT 'assigned',
  delivery_time DATETIME,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (driver_id) REFERENCES users(id)
);
```

---

### 💬 Optional: `notifications`, `reviews`, `support_tickets` (add later)
