const db = require('../config/db');

const CategoryModel = {
    getAll: (callback) => {
        const sql = 'SELECT * FROM categories';
        db.query(sql, callback);
    }
};

module.exports = CategoryModel;
