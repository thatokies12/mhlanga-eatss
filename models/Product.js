class Product {
    constructor(data) {
        this.storeId = data.storeId;
        this.name = data.name;
        this.description = data.description;
        this.price = data.price;
        this.image = data.image;
    }

    static create(product, db, callback) {
        const sql = `INSERT INTO products (store_id, name, description, price, image)
                 VALUES (?, ?, ?, ?, ?)`;
        const values = [product.storeId, product.name, product.description, product.price, product.image];
        db.query(sql, values, callback);
    }

    static findByStoreId(storeId, db, callback) {
        const sql = `SELECT * FROM products WHERE store_id = ?`;
        db.query(sql, [storeId], callback);
    }

    static update(id, data, db, callback) {
        const sql = `
      UPDATE products SET name = ?, description = ?, price = ?${data.image ? ', image = ?' : ''}
      WHERE id = ?`;

        const values = data.image
            ? [data.name, data.description, data.price, data.image, id]
            : [data.name, data.description, data.price, id];

        db.query(sql, values, callback);
    }

    static delete(id, db, callback) {
        const sql = `DELETE FROM products WHERE id = ?`;
        db.query(sql, [id], callback);
    }
}

module.exports = Product;
