const db = require('../config/db'); // Adjust path to your DB connection

const OrderController = {
    getStoreOrders: (req, res) => {
        console.log("full query object:", req.query)
        const managerId = req.query.managerId;

        console.log("managerId query param:", managerId);

        if (!managerId) {
            return res.status(400).json({ error: 'Missing manager ID' });
        }

        // Step 1: Get store ID from the manager's user ID
        const getStoreQuery = `SELECT id FROM stores WHERE manager_id = ?`;

        db.query(getStoreQuery, [managerId], (err, storeResult) => {
            if (err || storeResult.length === 0) {
                return res.status(403).json({ error: 'No store found for this manager' });
            }

            const storeId = storeResult.map(row => row.id);
            console.log('store id = ', storeId)

            // Step 2: Fetch orders for that store
            const getOrdersQuery = `
        SELECT o.*, u.username AS customer_name
        FROM orders o
        JOIN users u ON o.customer_id = u.id
        WHERE o.store_id IN (?)
        ORDER BY o.created_at DESC
      `;

            db.query(getOrdersQuery, [storeId], (err, orders) => {
                if (err) return res.status(500).json({ error: 'Failed to load orders' });
                res.json(orders);
            });
        });
    },

    updateOrderStatus: (req, res) => {
        const orderId = req.params.id;
        const { status } = req.body;

        const updateStatusQuery = `UPDATE orders SET status = ? WHERE id = ?`;

        db.query(updateStatusQuery, [status, orderId], (err) => {
            if (err) return res.status(500).json({ error: 'Failed to update status' });

            // If status is 'ready', insert into deliveries
            if (status === 'ready') {
                const getAddressQuery = `
          SELECT o.address FROM orders o
          JOIN users u ON o.customer_id = u.id
          WHERE o.id = ?
        `;

                db.query(getAddressQuery, [orderId], (err, result) => {
                    if (err || result.length === 0) {
                        return res.status(500).json({ error: 'Failed to fetch address' });
                    }

                    const address = result[0].address;
                    const insertDeliveryQuery = `
            INSERT INTO deliveries (order_id, address)
            VALUES (?, ?)
          `;

                    db.query(insertDeliveryQuery, [orderId, address], (err) => {
                        if (err) return res.status(500).json({ error: 'Delivery insert failed' });

                        // Later: notify driver + customer
                        res.json({ message: 'Order marked ready and delivery created.' });
                    });
                });
            } else {
                res.json({ message: 'Order status updated.' });
            }
        });
    }
};

module.exports = OrderController;
