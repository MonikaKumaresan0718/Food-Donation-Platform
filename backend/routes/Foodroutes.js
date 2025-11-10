const express = require('express');
const router = express.Router();
const { addFood, getAvailableFoods, claimFood } = require('../controllers/foodController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Setup image storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post('/', protect, upload.single('image'), addFood);
router.get('/', getAvailableFoods);
router.put('/:id/claim', protect, claimFood);

module.exports = router;
