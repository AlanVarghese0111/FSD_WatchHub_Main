const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image:{
    type:String,
    required:true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status:{
    type:String,
    default: 'ordered' // Set default value to 'ordered'
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
