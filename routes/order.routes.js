const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/place', (req, res) => {
    const { customerId, products } = req.body;

    if (!customerId || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'Invalid request' });
    }

    const productMap = {};
    products.forEach(pid => {
        productMap[pid] = (productMap[pid] || 0) + 1;
    });

    const sqlOrder = "INSERT INTO orders (customer_id) VALUES (?)";
    db.query(sqlOrder, [customerId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const orderId = result.insertId;
        const items = Object.entries(productMap).map(([pid, qty]) => [orderId, pid, qty]);

        const sqlItems = "INSERT INTO order_items (order_id, product_id, quantity) VALUES ?";
        db.query(sqlItems, [items], (err2) => {
            if (err2) return res.status(500).json({ error: err2.message });

            res.status(201).json({ message: 'Order placed successfully', orderId });
        });
    });
});

module.exports = router;
