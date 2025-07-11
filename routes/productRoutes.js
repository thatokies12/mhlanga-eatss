const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.get('/store/:storeId', ProductController.getByStore);
router.get('/:id', ProductController.getOne);
router.post('/', upload.single('image'), ProductController.create);
router.put('/:id', upload.single('image'), ProductController.update);
router.delete('/:id', ProductController.delete);

module.exports = router;
