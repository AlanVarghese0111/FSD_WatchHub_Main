// models/CartItem.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  itemName: String,
  price: Number,
  quantity: Number,
  firstName: String,
  lastName: String,
  address: String,
});

module.exports = mongoose.model('CartItem', cartItemSchema);
