// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Define route for user signup
router.post('/signup', async (req, res) => {
  try {
    // Create a new user instance
    const newUser = new User(req.body);

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with the saved user object
    res.status(201).json(savedUser);
  } catch (error) {
    // Handle errors
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define route for user login
router.post('/login', async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;
    console.log('Received login request:', email, password);

    // Find user with provided email
    const user = await User.findOne({ email });
    console.log('Found user:', user);

    // Check if user exists and if the password matches
    if (!user || user.password !== password) {
      console.log('Invalid credentials');
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // If email and password are correct, return success message or user data
    console.log('Login successful');
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    // Handle errors
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define route for fetching all registered users
router.get('/viewusers', async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Respond with the array of users
    res.status(200).json(users);
  } catch (error) {
    // Handle errors
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define route to delete a user by userId
router.delete('/deleteusers/:userId', async (req, res) => {
  try {
    // Extract userId from request parameters
    const { userId } = req.params;

    // Find user by userId and delete it
    const deletedUser = await User.findByIdAndDelete(userId);

    // Check if user exists
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with success message
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    // Handle errors
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET user details by ID
router.get('/fetchuser/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;
