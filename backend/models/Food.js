const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  foodName: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  pickupAddress: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  expiryTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'claimed', 'expired'],
    default: 'available',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Food', foodSchema);
