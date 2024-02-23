// routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');

// POST route to add item to cart
router.post('/addcart', async (req, res) => {
  try {
    const { itemName, price, quantity, id, firstName, lastName, address, userId } = req.body;
    const cartItem = new CartItem({
      itemName,
      price,
      quantity,
      id,
      firstName,
      lastName,
      address,
      userId,
    });
    await cartItem.save();
    res.status(201).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE route to remove item from cart
router.delete('/removecart/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const deletedItem = await CartItem.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route to fetch cart items by user ID
router.get('/usercartitems/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userCartItems = await CartItem.find({ userId });
    res.status(200).json(userCartItems);
  } catch (error) {
    console.error('Error fetching user cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch all cart items
router.get('/cartitems', async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
