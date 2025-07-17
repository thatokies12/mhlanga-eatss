const express = require('express');
const router = express.Router();
const DeliveryController = require('../controllers/delivery.controller');

// Get available deliveries
router.get('/available', DeliveryController.getAvailableDeliveries);

// Accept a delivery
router.post('/accept', DeliveryController.acceptDelivery);

module.exports = router;
