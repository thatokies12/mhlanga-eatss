const Store = require('../models/Store');
const db = require('../config/db');

exports.registerStore = (req, res) => {
    const { managerId, name, location, contactInfo } = req.body;
    const image = req.file ? req.file.filename : null;

    const newStore = new Store({ managerId, name, location, contactInfo, image });

    Store.save(newStore, db, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Restaurant store registered successfully' });
    });
};

exports.getStores = (req, res) => {
    const managerId = req.params.managerId;

    const sql = `
    SELECT * FROM stores
    WHERE manager_id = ?`;

    db.query(sql, [managerId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.deleteStore = (req, res) => {
    const storeId = req.params.id;

    const sql = `DELETE FROM stores WHERE id = ?`;

    db.query(sql, [storeId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Store not found or already deleted.' });
        }

        res.json({ message: 'Store deleted successfully.' });
    });
};

exports.getStoreById = (req, res) => {
    const storeId = req.params.id;

    const sql = `SELECT * FROM stores WHERE id = ?`;
    db.query(sql, [storeId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Store not found' });
        res.json(results[0]);
    });
};

exports.updateStore = (req, res) => {
    const storeId = req.params.id;
    const { name, location, contactInfo } = req.body;
    const image = req.file ? req.file.filename : null;

    const sql = `
    UPDATE stores SET name = ?, location = ?, contact_info = ?${image ? ', image = ?' : ''}
    WHERE id = ?`;

    const values = image
        ? [name, location, contactInfo, image, storeId]
        : [name, location, contactInfo, storeId];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Store updated successfully' });
    });
};
