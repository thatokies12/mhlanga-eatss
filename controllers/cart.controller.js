const CartModel = require('../models/Cart');

const CartController = {
    placeCartOrder: (req, res) => {
        const { customerId, address, payment, cartItems, storeId } = req.body;

        if (!customerId || !cartItems || !address || !payment || cartItems.length === 0) {
            return res.status(400).json({ error: 'Missing data' });
        }

        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // Step 1: Create cart
        CartModel.createCart(customerId, (err, cartRes) => {
            if (err) return res.status(500).json({ error: 'Cart creation failed' });

            const cartId = cartRes.insertId;

            // Step 2: Insert cart items
            CartModel.insertCartItems(cartId, cartItems, (err) => {
                if (err) return res.status(500).json({ error: 'Adding cart items failed' });

                // Step 3: Create order
                CartModel.createOrder(customerId, cartId, total, payment, storeId, address, (err, orderRes) => {
                    if (err) return res.status(500).json({ error: 'Order creation failed' });

                    const orderId = orderRes.insertId;

                    // ✅ Step 4: Insert into order_items
                    CartModel.insertOrderItems(orderId, cartItems, (err) => {
                        if (err) return res.status(500).json({ error: 'Failed to insert order items' });

                        res.json({ message: 'Order placed successfully!' });
                    });
                });
            });
        });
    }
};



/*Notify driver
db.query(
    `INSERT INTO notifications (user_id, message) VALUES (?, ?)`,
    [driverId, `You have a new delivery assigned (Order #${orderId})`]
);

// Notify all managers (optional: only store-specific in future)
db.query(
    `SELECT id FROM users WHERE role = 'manager'`,
    (err, managers) => {
        if (!err && managers.length) {
            const messages = managers.map(m => [m.id, `New order placed by customer #${customerId}`]);
            db.query(`INSERT INTO notifications (user_id, message) VALUES ?`, [messages]);
        }
    }
);
},

addToCart: (req, res) => {
const { userId, productId, quantity } = req.body;

if (!userId || !productId || !quantity) {
    return res.status(400).json({ error: 'Missing cart input' });
}

// Check if cart exists for this user
CartModel.getOrCreateCart(userId, (err, cart) => {
    if (err || !cart) return res.status(500).json({ error: 'Cart error' });

    const cartId = cart.id;

    // Check if product already in cart
    CartModel.findCartItem(cartId, productId, (err, item) => {
        if (err) return res.status(500).json({ error: 'Cart item check failed' });

        if (item) {
            // Update quantity
            const newQty = item.quantity + quantity;
            CartModel.updateCartItem(cartId, productId, newQty, (err) => {
                if (err) return res.status(500).json({ error: 'Failed to update cart item' });
                return res.json({ message: 'Cart updated' });
            });
        } else {
            // Insert new item
            CartModel.insertCartItem(cartId, productId, quantity, (err) => {
                if (err) return res.status(500).json({ error: 'Failed to add to cart' });
                return res.json({ message: 'Item added to cart' });
            });
        }
    });
});
}*/






module.exports = CartController;
