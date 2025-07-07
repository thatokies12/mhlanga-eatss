const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/restaurants', (req, res) => {
    const sql = "SELECT * FROM stores";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;
