const CategoryModel = require('../models/Category');

const CategoryController = {
    getAll: (req, res) => {
        CategoryModel.getAll((err, results) => {
            if (err) {
                console.error('Error fetching categories:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(results);
        });
    }
};

module.exports = CategoryController;
