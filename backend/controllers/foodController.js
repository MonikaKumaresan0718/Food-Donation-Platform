const Food = require('../models/Food');

// Add new food (with optional image)
exports.addFood = async (req, res) => {
  try {
    const { foodName, quantity, location, expiryDate } = req.body;

    const food = await Food.create({
      donor: req.user._id,
      foodName,
      quantity,
      location,
      expiryDate,
      image: req.file ? req.file.filename : null,
    });

    res.status(201).json({ success: true, food });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get available foods
exports.getAvailableFoods = async (req, res) => {
  try {
    const foods = await Food.find({ status: 'available' })
      .populate('donor', 'name email');

    res.status(200).json({ success: true, foods });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Claim food by NGO
exports.claimFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    food.status = 'claimed';
    await food.save();

    res.status(200).json({ success: true, food });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
