import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Paper, Grid, Button, CircularProgress, TextField } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const BuyNow = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/vieweachproduct/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductById();
  }, [productId]);

  const handlePlaceOrder = async () => {
    try {
      await axios.post('http://localhost:5000/api/order/placeorder', {
        productId,
        quantity,
        firstName,
        address,
        phoneNumber,
      });
      console.log('Order placed successfully!');
      alert('Your order has been placed successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again later.');
    }
  };

  if (!product) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h2" gutterBottom align="center">
        Buy Now
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper>
            <Typography variant="h5" component="h2" gutterBottom align="center">
              {product.name}
            </Typography>
            <img src={product.image} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
            <Typography variant="body1" color="textSecondary" paragraph align="center">
              {product.description}
            </Typography>
            <Typography variant="body1" align="center">Price: ${product.price}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant="outlined"
              fullWidth
              style={{ marginTop: '20px' }}
              required
            />
            <TextField
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              variant="outlined"
              fullWidth
              style={{ marginTop: '20px' }}
              required
            />
            <TextField
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              variant="outlined"
              fullWidth
              style={{ marginTop: '20px' }}
              required
            />
            <Button variant="contained" color="primary" fullWidth onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default BuyNow;
