const express = require('express');
const router = express.Router();
const CartItem = require('../models/Cart');

// POST route to add a new item to the cart
router.post('/add-to-cart', async (req, res) => {
    try {
        const { userId, name, price, image, quantity } = req.body;

        // Create a new cart item
        const newItem = new CartItem({
            userId: userId,
            name: name,
            price: price,
            image: image,
            quantity: quantity
        });

        // Save the new item to the database
        const savedItem = await newItem.save();

        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET route to fetch cart items by user ID
router.get('/cartitems/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      // Find all cart items associated with the given user ID
      const cartItems = await CartItem.find({ userId: userId });
      res.json(cartItems);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // DELETE route to delete a cart item by ID
router.delete('/remove/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        // Find and delete the cart item with the given ID
        await CartItem.findByIdAndDelete(itemId);
        res.json({ message: 'Cart item deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
