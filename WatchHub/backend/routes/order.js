// backend/routes/orders.js

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
// POST - Place a new order
router.post('/placeorder', async (req, res) => { 
  const { productId, userId, image,firstName, lastName, address, pincode, landmark, phoneNumber, quantity,status } = req.body;

  try {
    console.log('Received order request:', req.body); // Log the entire request body

    // const userEmail = req.body.userEmail || localStorage.getItem('userEmail'); // Retrieve userEmail from request body or local storage

    const order = new Order({
      productId,
      userId,
      image,
      firstName,
      lastName,
      address,
      pincode,
      landmark,
      phoneNumber,
      quantity, 
      status
    });

    const newOrder = await order.save();
    
    console.log('Order placed successfully:', newOrder); // Log the created order details
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(400).json({ message: err.message });
  }
});


// POST - Place orders for all items in the cart
router.post('/placeordercart', async (req, res) => {
  const orders = req.body.orders; // Array of orders from the cart

  try {
    console.log('Received order requests:', orders); // Log the received order requests

    const placedOrders = []; // Array to store successfully placed orders

    // Iterate over each order in the array
    for (const orderData of orders) {
      const { productId, userId, image, firstName, lastName, address, pincode, landmark, phoneNumber, quantity } = orderData;

      const order = new Order({
        productId,
        userId,
        image,
        firstName,
        lastName,
        address,
        pincode,
        landmark,
        phoneNumber,
        quantity,
        status: 'Placed', // Assuming status is set to 'Placed' for new orders
      });

      // Save the order to the database
      const newOrder = await order.save();

      placedOrders.push(newOrder); // Push the successfully placed order to the array
    }

    console.log('Orders placed successfully:', placedOrders); // Log the successfully placed orders
    res.status(201).json(placedOrders); // Respond with the array of placed orders
  } catch (err) {
    console.error('Error placing orders:', err);
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

// GET - Find total number of orders available
router.get('/totalorders', async (req, res) => {
  try {
    const totalOrdersCount = await Order.countDocuments();
    res.status(200).json({ totalOrders: totalOrdersCount });
  } catch (error) {
    console.error('Error fetching total orders count:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PATCH - Update the status of an order by ID
router.patch('/cancelorder/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    // Check if the order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the status of the order to 'cancelled'
    order.status = 'cancelled';
    await order.save();

    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (error) {
    console.error('Error canceling order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// PUT - Edit the status of an order by ID
router.put('/editstatus/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Check if the order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the status of the order
    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET - Fetch product status from order table based on product and user
router.get('/productstatus/:productId/:userId', async (req, res) => {
  try {
    const { productId, userId } = req.params;

    // Find order by product ID and user ID
    const order = await Order.findOne({ productId, userId });

    // Check if order exists
    if (!order) {
      return res.status(404).json({ message: 'Order not found for this product and user' });
    }

    // Respond with the status of the product in the order
    res.status(200).json({ status: order.status });
  } catch (error) {
    console.error('Error fetching product status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




module.exports = router;
