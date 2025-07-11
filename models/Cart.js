const db = require('../config/db');

const CartModel = {
    getAvailableDriver: (callback) => {
        db.query(`SELECT id FROM users WHERE role = 'driver' ORDER BY RAND() LIMIT 1`, callback);
    },

    createOrder: (customerId, driverId, total, callback) => {
        const sql = `INSERT INTO orders (customer_id, driver_id, total_amount) VALUES (?, ?, ?)`;
        db.query(sql, [customerId, driverId, total], callback);
    },

    insertOrderItems: (orderId, items, callback) => {
        const sql = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?`;
        const values = items.map(item => [orderId, item.productId, item.quantity, item.price]);
        db.query(sql, [values], callback);
    }
};

module.exports = CartModel;
