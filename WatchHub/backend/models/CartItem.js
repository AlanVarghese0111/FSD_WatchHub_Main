// models/CartItem.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  itemName: String,
  price: Number,
  quantity: Number,
  firstName: String,
  lastName: String,
  address: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

module.exports = mongoose.model('CartItem', cartItemSchema);
