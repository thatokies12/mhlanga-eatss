const ProductModel = require('../models/ProductModel');
const path = require('path');

const ProductController = {
    getByStore: (req, res) => {
        ProductModel.getByStore(req.params.storeId, (err, products) => {
            if (err) return res.status(500).json({ error: 'DB error' });
            res.json(products);
        });
    },

    getOne: (req, res) => {
        ProductModel.getById(req.params.id, (err, product) => {
            if (err || !product.length) return res.status(404).json({ error: 'Not found' });
            res.json(product[0]);
        });
    },

    create: (req, res) => {
        const { storeId, name, description, price, categoryId } = req.body;
        console.log('storeid: ', storeId, '.. name: ', name, '.. cat: ', categoryId)
        const image = req.file?.filename || null;

        if (!storeId || !name || !price || !categoryId)
            return res.status(400).json({ error: 'Missing fields' });

        ProductModel.create({ name, description, price, image, storeId, categoryId }, (err) => {
            if (err) return res.status(500).json({ error: 'DB error' });
            res.json({ message: 'Product added' });
        });
    },

    update: (req, res) => {
        const { name, price, category } = req.body;
        const image = req.file?.filename || req.body.existingImage;

        ProductModel.update(req.params.id, { name, price, category, image }, (err) => {
            if (err) return res.status(500).json({ error: 'Update failed' });
            res.json({ message: 'Product updated' });
        });
    },

    delete: (req, res) => {
        ProductModel.delete(req.params.id, (err) => {
            if (err) return res.status(500).json({ error: 'Delete failed' });
            res.json({ message: 'Product deleted' });
        });
    }
};

module.exports = ProductController;
