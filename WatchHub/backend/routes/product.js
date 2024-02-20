// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Define route for adding a new product
router.post('/addproduct', async (req, res) => {
  try {
    // Create a new product instance
    const newProduct = new Product(req.body);

    // Save the product to the database
    const savedProduct = await newProduct.save();

    // Respond with the saved product object
    res.status(201).json(savedProduct);
  } catch (error) {
    // Handle errors
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define route for fetching all products
router.get('/viewproducts', async (req, res) => {
    try {
      // Fetch all products from the database
      const products = await Product.find();
  
      // Respond with the array of products
      res.status(200).json(products);
    } catch (error) {
      // Handle errors
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  // Define route for fetching a product by ID
router.get('/vieweachproduct/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
      // Fetch the product from the database by its ID
      const product = await Product.findById(productId);
      
      if (!product) {
        // If product is not found, return a 404 Not Found response
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Respond with the product details
      res.status(200).json(product);
    } catch (error) {
      // Handle errors
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// DELETE request to delete a product by ID
router.delete('/delete/:productId', async (req, res) => {
    try {
      const { productId } = req.params;
  
      // Find the product by ID and delete it
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Respond with a success message or the deleted product
      res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Update a product by ID
router.put('/update/:id', async (req, res) => {
  const productId = req.params.id;
  const updates = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define route for fetching products by category
router.get('/viewproductsbycategory/:category', async (req, res) => {
  try {
    const category = req.params.category;

    // Fetch products from the database based on category
    const products = await Product.find({ category });

    // Respond with the array of products
    res.status(200).json(products);
  } catch (error) {
    // Handle errors
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define route to get the total number of products
router.get('/totalproducts', async (req, res) => {
  try {
    // Count all products in the database
    const totalProducts = await Product.countDocuments();

    // Respond with the total number of products
    res.status(200).json({ totalProducts });
  } catch (error) {
    // Handle errors
    console.error('Error fetching total number of products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define route to fetch all orders
router.get('/vieworders', async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find();

    // Respond with the array of orders
    res.status(200).json(orders);
  } catch (error) {
    // Handle errors
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// // Fetch product details by ID
// router.get('/vieweachproduct/:id', async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }
//     res.json(product);
//   } catch (error) {
//     console.error('Error fetching product details:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

module.exports = router;
