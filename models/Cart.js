const db = require('../config/db');

const CartModel = {
    createCart: (userId, callback) => {
        db.query(`INSERT INTO carts (user_id) VALUES (?)`, [userId], callback);
    },

    insertCartItems: (cartId, items, callback) => {
        const values = items.map(i => [cartId, i.productId, i.quantity]);
        db.query(`INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ?`, [values], callback);
    },

    createOrder: (userId, cartId, total, payment, storeId, address, callback) => {
        db.query(
            `INSERT INTO orders (customer_id, cart_id, total, payment_method, store_id, address) VALUES (?, ?, ?, ?, ?, ?)`,
            [userId, cartId, total, payment, storeId, address],
            callback
        );
    },

    insertOrderItems: (orderId, items, callback) => {
        const values = items.map(item => [orderId, item.productId, item.quantity]);
        const sql = `INSERT INTO order_items (order_id, product_id, quantity) VALUES ?`;

        db.query(sql, [values], callback);
    }





    /*getAvailableDriver: (callback) => {
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
    },

    getOrCreateCart: (userId, callback) => {
        db.query(`SELECT * FROM carts WHERE user_id = ?`, [userId], (err, result) => {
            if (err) return callback(err);
            if (result.length) return callback(null, result[0]);

            // No cart found, create one
            db.query(`INSERT INTO carts (user_id) VALUES (?)`, [userId], (err, res) => {
                if (err) return callback(err);
                callback(null, { id: res.insertId });
            });
        });
    },

    findCartItem: (cartId, productId, callback) => {
        db.query(
            `SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?`,
            [cartId, productId],
            (err, result) => {
                if (err) return callback(err);
                callback(null, result[0]);
            }
        );
    },

    updateCartItem: (cartId, productId, quantity, callback) => {
        db.query(
            `UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?`,
            [quantity, cartId, productId],
            callback
        );
    },

    insertCartItem: (cartId, productId, quantity, callback) => {
        db.query(
            `INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)`,
            [cartId, productId, quantity],
            callback
        );
    },*/

};



module.exports = CartModel;
