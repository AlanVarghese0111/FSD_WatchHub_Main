// backend/routes/orders.js

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST - Place a new order
router.post('/placeorder', async (req, res) => {
  const { productId, firstName, address, phoneNumber, quantity } = req.body;

  try {
    const order = new Order({
      productId,
      firstName,
      address,
      phoneNumber,
      quantity,
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// GET - Fetch all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
module.exports = router;
