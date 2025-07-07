class Store {
    constructor(data) {
        this.managerId = data.managerId;
        this.name = data.name;
        this.location = data.location;
        this.contactInfo = data.contactInfo;
        this.image = data.image;
    }
    static save(store, db, callback) {
        const sql = `INSERT INTO stores (manager_id, name, location, contact_info, image) VALUES (?, ?, ?, ?, ?)`;
        const values = [store.managerId, store.name, store.location, store.contactInfo, store.image];
        db.query(sql, values, callback);
    }
}

module.exports = Store; 