const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Include the authentication routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Route for products
const productRoute=require('./routes/product');
app.use('/api/product',productRoute);

// Other routes...

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
