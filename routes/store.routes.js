const express = require('express');
const multer = require('multer');
const path = require('path');
const managerController = require('../controllers/store.controller');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.post('/register-store', upload.single('image'), managerController.registerStore);
router.get('/stores/:managerId', managerController.getStores);
router.delete('/delete-store/:id', managerController.deleteStore);
router.get('/store/:id', managerController.getStoreById);
router.put('/update-store/:id', upload.single('image'), managerController.updateStore);




module.exports = router;
