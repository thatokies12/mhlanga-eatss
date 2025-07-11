const path = require('path');
const Product = require('../models/Product');
const db = require('../config/db');

const ProductController = {
    addProduct: async (req, res) => {
        try {
            const { storeId, name, description, price, categoryId } = req.body;
            const image = req.file ? req.file.filename : null;

            if (!storeId || !name || !price || !categoryId) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const product = new Product(db);
            await product.create({ storeId, name, description, price, image, categoryId });

            res.status(201).json({ message: 'Product added successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getProductsByStore: async (req, res) => {
        try {
            const { storeId } = req.params;
            const product = new Product(db);
            const products = await product.getProductsByStore(storeId);
            res.json(products);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch products' });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, price, categoryId } = req.body;
            const image = req.file ? req.file.filename : req.body.existingImage || null;

            const product = new Product(db);
            await product.update(id, { name, description, price, image, categoryId });

            res.json({ message: 'Product updated successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update product' });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const product = new Product(db);
            await product.delete(id);
            res.json({ message: 'Product deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete product' });
        }
    }
};

module.exports = ProductController;
