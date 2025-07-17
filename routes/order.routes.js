const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order.controller'); // adjust if needed

// Manager-specific route to get orders for their store
router.get('/store-orders', OrderController.getStoreOrders);

// Route to update order status
router.post('/:id/status', OrderController.updateOrderStatus);

module.exports = router;
