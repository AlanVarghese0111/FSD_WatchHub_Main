// BuyNow.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Paper,
  Grid,
  Button,
  CircularProgress,
  TextField,
  Divider,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  backgroundColor: '#ffffff',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
}));

const StyledImage = styled('img')({
  maxWidth: '100%',
  height: '200px',
  objectFit: 'cover',
  marginBottom: '16px',
});

const StyledFormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledFormControl = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1),
  width: '100%',
  maxWidth: '300px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: '#333',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: 'brown',
  },
}));

const BuyNow = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');
  const [lastName, setLastName] = useState('');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userId, setUserId] = useState('');
  const { productId, quantity: urlQuantity } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/vieweachproduct/${productId}`);
        setProduct(response.data);
        setQuantity(Number(urlQuantity));

        const storedFirstName = localStorage.getItem('firstName') || '';
        const storedLastName = localStorage.getItem('lastName') || '';
        const storedAddress = localStorage.getItem('address') || '';
        const storedPincode = localStorage.getItem('pincode') || '';
        const storedLandmark = localStorage.getItem('landmark') || '';
        const storedPhoneNumber = localStorage.getItem('phoneNumber') || '';
        const storedUserId = localStorage.getItem('userId') || '';

        setUserId(storedUserId);
        setFirstName(storedFirstName);
        setAddress(storedAddress);
        setLastName(storedLastName);
        setPincode(storedPincode);
        setLandmark(storedLandmark);
        setPhoneNumber(storedPhoneNumber);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductById();
  }, [productId, urlQuantity]);

  const calculateTotalPrice = () => {
    if (product) {
      return product.price * quantity;
    }
    return 0;
  };

  const handlePlaceOrder = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');

      if (!product) {
        console.error('Product details are not available');
        return;
      }

      const response = await fetch('http://localhost:5000/api/order/placeorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          userId,
          firstName,
          lastName,
          address,
          pincode,
          landmark,
          phoneNumber,
          quantity,
          image: product.image,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Order placed successfully!');
        console.log('Order details:', responseData);
        alert('Your order has been placed successfully!');
        navigate('/');
      } else {
        console.error('Error placing order:', responseData);
        alert('Failed to place order. Please try again later.');
      }
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
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" component="h2" gutterBottom>
              {product.name}
            </Typography>
            <StyledImage src={product.image} alt={product.name} />
            <Typography variant="body1" color="textSecondary" paragraph>
              {product.description}
            </Typography>
            <Typography variant="body1">Price: ${product.price}</Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledPaper elevation={3}>
            <StyledFormContainer>
              <Typography variant="h5" gutterBottom>
                Enter Your Details
              </Typography>
              <Divider style={{ marginBottom: '16px', width: '100%' }} />
              <StyledFormControl
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                variant="outlined"
                required
              />
              <StyledFormControl
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                variant="outlined"
                required
              />
              <StyledFormControl
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                variant="outlined"
                required
              />
              <StyledFormControl
                label="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                variant="outlined"
              />
              <StyledFormControl
                label="Landmark"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                variant="outlined"
              />
              <StyledFormControl
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                variant="outlined"
              /><br></br>
              <Typography variant="body1">Quantity: {quantity}</Typography>
              <Typography variant="body1">Total Price: ${calculateTotalPrice()}</Typography>
              <StyledButton variant="contained" color="primary" fullWidth onClick={handlePlaceOrder}>
                Place Order
              </StyledButton>
            </StyledFormContainer>
          </StyledPaper>
        </Grid>
      </Grid>
    </div>
  );
};

export default BuyNow;
