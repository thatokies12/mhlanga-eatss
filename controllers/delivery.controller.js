const db = require('../config/db');

const DeliveryController = {
    getAvailableDeliveries: (req, res) => {
        const sql = `
      SELECT d.*, o.total, u.username AS customer_name
      FROM deliveries d
      JOIN orders o ON d.order_id = o.id
      JOIN users u ON o.customer_id = u.id
      WHERE d.driver_id IS NULL AND d.delivery_status = 'ready'
    `;
        db.query(sql, (err, rows) => {
            if (err) return res.status(500).json({ error: 'Failed to load deliveries' });
            res.json(rows);
            console.log("Full query object:", rows)
        });

    },

    acceptDelivery: (req, res) => {
        const { deliveryId, driverId } = req.body;

        const sql = `
      UPDATE deliveries
      SET driver_id = ?, delivery_status = 'out for delivery', assigned_at = NOW()
      WHERE id = ? AND driver_id IS NULL
    `;
        db.query(sql, [driverId, deliveryId], (err, result) => {
            if (err) return res.status(500).json({ error: 'Failed to assign delivery' });

            if (result.affectedRows === 0) {
                return res.status(400).json({ error: 'Delivery already taken' });
            }

            res.json({ message: 'Delivery assigned to you' });
        });
    }
};

module.exports = DeliveryController;
