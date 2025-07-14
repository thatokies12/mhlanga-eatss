const db = require('../config/db');

exports.findByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) return reject(err);
            console.log("Checking username:", username); // 👈 debug
            console.log("Query results:", results); // 👈 debug
            resolve(results[0]);
        });
    });
};



exports.createUser = (username, email, role, password) => {
    return db.promise().query('INSERT INTO users (username, email, role, password) VALUES (?, ?, ?, ?)', [username, email, role, password]);
};