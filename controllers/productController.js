const db = require('../config/db');

// Create a product
exports.createProduct = (req, res) => {
    const { store_id, name, description, price, category, image_url } = req.body;
    const sql = `INSERT INTO products (store_id, name, description, price, category, image_url) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [store_id, name, description, price, category, image_url], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Product created', productId: result.insertId });
    });
};

// Get all products for a store
exports.getProductsByStore = (req, res) => {
    const { storeId } = req.params;
    db.query('SELECT * FROM products WHERE store_id = ?', [storeId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Update a product
exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, image_url, available } = req.body;
    const sql = `UPDATE products SET name=?, description=?, price=?, category=?, image_url=?, available=? WHERE id=?`;
    db.query(sql, [name, description, price, category, image_url, available, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Product updated' });
    });
};

// Delete a product
exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Product deleted' });
    });
};