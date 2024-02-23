// backend/routes/orders.js

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST - Place a new order
router.post('/placeorder', async (req, res) => { // Include leading / in route path
  const { productId, userId,firstName, address, phoneNumber, quantity } = req.body;

  try {
    const userEmail = req.body.userEmail || localStorage.getItem('userEmail'); // Retrieve userEmail from request body or local storage

    const order = new Order({
      productId,
      userId,
      firstName,
      address,
      phoneNumber,
      quantity,
      userEmail, 
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

// GET - Fetch orders by user ID
router.get('/userorders/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find orders by user ID
    const userOrders = await Order.find({ userId });

    // Check if user has any orders
    if (userOrders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    // Respond with the array of orders
    res.status(200).json(userOrders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
