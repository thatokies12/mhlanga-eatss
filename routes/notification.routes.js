const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get notifications for user
router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    db.query(`SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC`, [userId], (err, result) => {
        if (err) return res.status(500).json({ error: 'DB error' });
        res.json(result);
    });
});

// Mark all as read
router.put('/read/:userId', (req, res) => {
    const { userId } = req.params;
    db.query(`UPDATE notifications SET read_status = 1 WHERE user_id = ?`, [userId], (err) => {
        if (err) return res.status(500).json({ error: 'DB error' });
        res.json({ message: 'Notifications marked as read' });
    });
});

module.exports = router;
