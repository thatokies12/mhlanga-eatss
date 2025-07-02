class User {
    constructor(data) {
        this.username = data.username;
        this.email = data.email;
        this.role = data.role;
        this.password = data.password;
    }

    getProfile() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            role: this.role

        };
    }

    static save(user, db, callback) {
        const sql = 'INSERT INTO users (username, email, role, password) VALUES (?, ?, ?, ?)';
        db.query(sql, [user.username, user.email, user.role, user.password], callback);
    }
    static findByUsername(username, db, callback) {
        const sql = 'SELECT * FROM users WHERE username = ?';
        db.query(sql, [username], callback);
    }
}

module.exports = User;