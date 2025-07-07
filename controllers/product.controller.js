const Product = require('../models/Product');
const db = require('../config/db');

exports.addProduct = (req, res) => {
    const { storeId, name, description, price } = req.body;
    const image = req.file ? req.file.filename : null;

    const newProduct = new Product({ storeId, name, description, price, image });

    Product.create(newProduct, db, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Product added successfully' });
    });
};

exports.getProductsByStore = (req, res) => {
    const storeId = req.params.storeId;

    Product.findByStoreId(storeId, db, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.updateProduct = (req, res) => {
    const productId = req.params.id;
    const { name, description, price } = req.body;
    const image = req.file ? req.file.filename : null;

    Product.update(productId, { name, description, price, image }, db, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Product updated successfully' });
    });
};

exports.deleteProduct = (req, res) => {
    const productId = req.params.id;

    Product.delete(productId, db, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Product deleted successfully' });
    });
};
