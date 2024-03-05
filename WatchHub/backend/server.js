const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express(); // Move this line up

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Allow all origins
app.use(cors());

// Include the authentication routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Route for products
const productRoute = require('./routes/product');
app.use('/api/product', productRoute);

// Route for cart
const cartRoute=require('./routes/cart');
app.use('/api/cartItem',cartRoute);

// Route for orders
const orderRouter = require('./routes/order');
app.use('/api/order', orderRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
