const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authController.getProfile);
router.put('/profile', authController.updateProfile);

module.exports = router;
