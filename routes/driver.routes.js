const express = require('express');
const multer = require('multer');
const path = require('path');
const driverController = require('../controllers/driver.controller');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({ storage });

const multiUpload = upload.fields([
    { name: 'driverPhoto', maxCount: 1 },
    { name: 'idDocument', maxCount: 1 },
    { name: 'inspectionReport', maxCount: 1 },
    { name: 'licensePrdp', maxCount: 1 },
    { name: 'criminalRecord', maxCount: 1 }
]);

router.post('/apply', multiUpload, driverController.registerDriver);

module.exports = router;