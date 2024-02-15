import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Grid, Button, styled, CircularProgress } from '@mui/material';
import Userdata from './Userdata';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledPaper = styled(Paper)({
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const StyledImage = styled('img')({
  maxWidth: '100%',
  height: 'auto',
  marginBottom: '20px',
});

const TitleContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '20px',
});

const TitleIcon = styled(ShoppingCartIcon)({
  marginRight: '10px',
});

const BuyNow = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

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

  const handlePlaceOrder = () => {
    // Add logic to process the order, e.g., integrating a payment gateway
    console.log('Order placed:', product); // Console log for place order
    alert('Your order has been placed successfully!');
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
      <TitleContainer>
        <TitleIcon />
        <Typography variant="h2" gutterBottom align="center">
          Buy Now
        </Typography>
      </TitleContainer>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <StyledImage src={product.image} alt={product.name} />
            <Typography variant="h5" component="h2" gutterBottom align="center">
              {product.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph align="center">
              {product.description}
            </Typography>
            <Typography variant="body1" align="center">Price: ${product.price}</Typography>
          </StyledPaper>
        </Grid>
      </Grid>
      <Typography variant="h4" gutterBottom align="center">
        Deliver To
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <Userdata />
          </StyledPaper>
        </Grid>
      </Grid>
      <Typography variant="h4" gutterBottom align="center">
        Payment Options
      </Typography>
      <Typography variant="body1" paragraph align="center">
        You can pay by Credit/Debit Card, PayPal, or Cash on Delivery.
      </Typography>
      <Button variant="contained" color="primary" fullWidth onClick={handlePlaceOrder}>
        Place Order
      </Button>
    </div>
  );
};

export default BuyNow;
