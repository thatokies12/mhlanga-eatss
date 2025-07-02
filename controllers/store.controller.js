const db = require('../config/db');

// Create a new store
exports.createStore = (req, res) => {
    const { name, description, logo_url, location, contact_info, manager_id } = req.body;
    const sql = `INSERT INTO stores (name, description, logo_url, location, contact_info, manager_id) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [name, description, logo_url, location, contact_info, manager_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Store created', storeId: result.insertId });
    });
};

// Get all stores
exports.getAllStores = (req, res) => {
    db.query('SELECT * FROM stores', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Get a specific store
exports.getStoreById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM stores WHERE id = ?', [id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rows.length === 0) return res.status(404).json({ error: 'Store not found' });
        res.json(rows[0]);
    });
};

// Update a store
exports.updateStore = (req, res) => {
    const { id } = req.params;
    const { name, description, logo_url, location, contact_info } = req.body;
    const sql = `UPDATE stores SET name=?, description=?, logo_url=?, location=?, contact_info=? WHERE id=?`;
    db.query(sql, [name, description, logo_url, location, contact_info, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Store updated' });
    });
};

// Delete a store
exports.deleteStore = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM stores WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Store deleted' });
    });
};