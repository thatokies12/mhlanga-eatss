const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.register = async (req, res) => {
    const { username, email, role, password } = req.body;

    try {
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.createUser(username, email, role, hashedPassword);
            res.json({ message: "User registered successfully!" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findByUsername(username);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        else {
            res.json({ message: "Login sucessful" });
        }
        console.log("Plain password:", password);
        console.log("Hashed from DB:", user.password);


        /* Success
        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });*/

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: err.message });
    }
};

