const db = require('../config/db');

const ProductModel = {
    getByStore: (storeId, callback) => {
        db.query(`SELECT * FROM products WHERE store_id = ?`, [storeId], callback);
    },

    getById: (id, callback) => {
        db.query(`SELECT * FROM products WHERE id = ?`, [id], callback);
    },

    create: (data, callback) => {
        const { storeId, name, description, price, categoryId, image } = data;
        db.query(
            `INSERT INTO products (name, description, price, image, store_id, category) VALUES (?, ?, ?, ?, ?, ?)`,
            [name, description, price, image, storeId, categoryId],
            callback
        );
    },

    update: (id, data, callback) => {
        const { name, description, price, categoryId, image } = data;
        db.query(
            `UPDATE products SET name = ?, description = ?, price = ?, category = ?, image = ? WHERE id = ?`,
            [name, description, price, categoryId, image, id],
            callback
        );
    },

    delete: (id, callback) => {
        db.query(`DELETE FROM products WHERE id = ?`, [id], callback);
    }
};

module.exports = ProductModel;
