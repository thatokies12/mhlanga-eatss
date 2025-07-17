const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart.controller');


router.post('/checkout', CartController.placeCartOrder);



module.exports = router;
