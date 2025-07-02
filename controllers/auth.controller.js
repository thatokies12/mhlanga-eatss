const bcrypt = require('bcryptjs');
const User = require('../models/User');
const db = require('../config/db');

exports.register = (req, res) => {
    const { username, email, role, password } = req.body;

    // 1. Check if username already exists
    User.findByUsername(username, db, (err, results) => {
        if (err) {
            console.error("Error during username check:", err);
            return res.status(500).json({ error: err.message });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'User with this username already exists' });
        }

        // 2. Hash password
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error("Error hashing password:", err);
                return res.status(500).json({ error: err.message });
            }

            // 3. Create new user object
            const newUser = new User({ username, email, role, password: hash });

            // 4. Save user
            User.save(newUser, db, (err, result) => {
                if (err) {
                    console.error("Error saving user:", err);
                    return res.status(500).json({ error: err.message });
                }

                return res.status(201).json({ message: "User registered successfully" });
            });
        });
    });
};


exports.login = (req, res) => {
    const { username, password } = req.body;
    console.log('[Login Attempt]', { username }); // 🔍 Log attempt

    User.findByUsername(username, db, (err, results) => {
        if (err) {
            console.error('[DB Error - findByUsername]', err);
            return res.status(500).json({ error: 'Database error during login' });
        }

        if (results.length === 0) {
            console.warn('[Login Failed] No user found with username:', username);
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const user = results[0];
        console.log('[User Found]', user);

        bcrypt.compare(password, user.password, (err, match) => {
            if (err) {
                console.error('[Bcrypt Error]', err);
                return res.status(500).json({ error: 'Error comparing passwords' });
            }

            if (!match) {
                console.warn('[Login Failed] Incorrect password for user:', username);
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            const redirectMap = {
                admin: '/admin/index.html',
                manager: '/manager/index.html',
                driver: '/driver/index.html',
                customer: '/customer/index.html'
            };

            console.log('[Login Success]', { username: user.username, role: user.role });

            return res.json({
                message: 'Login successful',
                user: { name: user.username, role: user.role },
                redirect: redirectMap[user.role]
            });
        });
    });
};
