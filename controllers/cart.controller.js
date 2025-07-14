const CartModel = require('../models/Cart');

const CartController = {
    placeCartOrder: (req, res) => {
        const { customerId, cartItems } = req.body;

        if (!customerId || !Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({ error: 'Missing cart data' });
        }

        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        CartModel.getAvailableDriver((err, driverResult) => {
            if (err || !driverResult.length) {
                return res.status(500).json({ error: 'No available driver' });
            }

            const driverId = driverResult[0].id;

            CartModel.createOrder(customerId, driverId, total, (err, orderResult) => {
                if (err) {
                    console.error('Create order error:', err);
                    return res.status(500).json({ error: 'Order failed' });
                }

                const orderId = orderResult.insertId;

                CartModel.insertOrderItems(orderId, cartItems, (err, itemResult) => {
                    if (err) {
                        console.error('Insert items error:', err);
                        return res.status(500).json({ error: 'Order items failed' });
                    }

                    res.json({ message: 'Order placed successfully!' });
                });
            });
        });

        // Notify driver
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
    }
};

module.exports = CartController;
