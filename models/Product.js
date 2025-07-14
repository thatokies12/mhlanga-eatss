class Product {
    constructor(db) {
        this.db = db;
    }

    async create({ storeId, name, description, price, image, categoryId }) {
        const sql = `
      INSERT INTO products (store_id, name, description, price, image, category_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
        const [result] = await this.db.execute(sql, [storeId, name, description, price, image, categoryId]);
        return result;
    }

    async getProductsByStore(storeId) {
        const sql = `
      SELECT p.*, c.name AS category
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.store_id = ?
    `;
        const [rows] = await this.db.execute(sql, [storeId]);
        return rows;
    }

    async update(id, { name, description, price, image, categoryId }) {
        const sql = `
      UPDATE products
      SET name = ?, description = ?, price = ?, image = ?, category_id = ?
      WHERE id = ?
    `;
        const [result] = await this.db.execute(sql, [name, description, price, image, categoryId, id]);
        return result;
    }

    async delete(id) {
        const sql = `DELETE FROM products WHERE id = ?`;
        const [result] = await this.db.execute(sql, [id]);
        return result;
    }
}

module.exports = Product;
