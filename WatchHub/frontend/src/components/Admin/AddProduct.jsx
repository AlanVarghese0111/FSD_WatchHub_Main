import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Paper, Alert, Select, MenuItem, InputLabel } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Sidebar from './Sidebar'; // Import the Sidebar component

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    category: '', // Updated to use category as a state
    description: '',
    price: '',
    image: '',
    stock: '',
  });
  const [alert, setAlert] = useState({ message: '', severity: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend API to add the product
      const response = await fetch('http://localhost:5000/api/product/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      console.log('Product added:', data);
      setAlert({ message: 'Product added successfully!', severity: 'success' });
      // Optionally, reset the form after successful submission
      setProductData({
        name: '',
        category: '',
        description: '',
        price: '',
        image: '',
        stock: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
      setAlert({ message: 'Error adding product. Please try again later.', severity: 'error' });
      // Handle error
    }
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh', // 100% height of the viewport
      backgroundColor: '#f9f9f9',
    }}>
      {/* Render the Sidebar component */}
      <Sidebar />
      
      {/* Right Division */}
      <main className="right-panel" style={{
        width: '80%',
        height: '100%',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}>
        {/* Header */}
        <header style={{
          backgroundColor: '#333',
          color: '#fff',
          padding: '20px',
          textAlign: 'center',
          borderRadius: '8px',
          marginBottom: '20px',
        }}>
          <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Add Product</h1>
          <AddCircleOutlineIcon color="primary" style={{ fontSize: '42px' }} />
        </header>

        {/* Main content of AddProduct component */}
        <Container maxWidth="md">
          <Paper elevation={5} style={{ padding: '20px' }}>
            {alert.message && (
              <Alert severity={alert.severity} onClose={() => setAlert({ message: '', severity: '' })}>
                {alert.message}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel id="category-label">Select Category</InputLabel>
                  <Select
                    fullWidth
                    labelId="category-label"
                    value={productData.category}
                    onChange={handleChange}
                    name="category"  
                    required
                    variant="outlined"
                  >
                    <MenuItem value="">Select Category</MenuItem>
                    <MenuItem value="classic-watch">Classic Watch</MenuItem>
                    <MenuItem value="smart-watch">Smart Watch</MenuItem>
                    <MenuItem value="sports-watch">Sports Watch</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price"
                    variant="outlined"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Image URL"
                    variant="outlined"
                    name="image"
                    value={productData.image}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Stock"
                    variant="outlined"
                    name="stock"
                    value={productData.stock}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      backgroundColor: '#333',
                      '&:hover': {
                        backgroundColor: 'brown',
                      },
                    }}
                  >
                    Add Product
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </main>
    </div>
  );
};

export default AddProduct;
