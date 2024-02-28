import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Paper, Grid, Button, CircularProgress, TextField } from '@mui/material';

const BuyNow = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');
  const [lastName, setLastName] = useState('');
  const [pincode, setPincode] = useState(''); // Define pincode state
  const [landmark, setLandmark] = useState(''); // Define landmark state
  const [phoneNumber, setPhoneNumber] = useState('');
  const[userId,setUserId]=useState('');
  const { productId, quantity: urlQuantity } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/vieweachproduct/${productId}`);
        setProduct(response.data);
        setQuantity(Number(urlQuantity)); // Set the quantity from URL parameter

        // Retrieve user details from local storage and set the state
        const storedFirstName = localStorage.getItem('firstName') || '';
        const storedLastName=localStorage.getItem('lastName') ||'';
        const storedAddress=localStorage.getItem('address')
        const storedPincode = localStorage.getItem('pincode') || '';
        const storedLandmark = localStorage.getItem('landmark') || '';
        const storedPhoneNumber = localStorage.getItem('phoneNumber') || '';
        const storedUserId = localStorage.getItem('userId') || '';
        console.log(storedPincode);
        console.log(storedLandmark);
        console.log(storedPhoneNumber);
        console.log(storedUserId);

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
      console.log('userId before making the request:', userId);
      const userEmail = localStorage.getItem('userEmail');
  
      // Make sure the product details are available before making the request
      if (!product) {
        console.error('Product details are not available');
        return;
      }
  
      // Make the POST request to place the order using fetch
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
          image: product.image,  // Include product image URL in the request body
        }),
      });
  
      // Parse the JSON response
      const responseData = await response.json();
  
      // Check if the request was successful
      if (response.ok) {
        // If the request is successful, log the order details
        console.log('Order placed successfully!');
        console.log('Order details:', responseData); // Assuming the server responds with the created order
  
        alert('Your order has been placed successfully!');
        navigate('/');
      } else {
        // If the request is not successful, log the error
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
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper>
            <Typography variant="h5" component="h2" gutterBottom align="center">
              {product.name}
            </Typography>
            <img src={product.image} alt={product.name} style={{ maxWidth: '100%', height: '200px' }} /> {/* Set fixed height */}
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
  label="Last Name"
  value={lastName}
  onChange={(e) => setLastName(e.target.value)}
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
 label="pincode"
 value={pincode}
 onChange={(e) => setPincode(e.target.value)}
 variant="outlined"
 fullWidth
 style={{ marginTop: '20px' }}
/>
<TextField
 label="Landmark"
 value={landmark}
 onChange={(e) => setLandmark(e.target.value)}
 variant="outlined"
 fullWidth
 style={{ marginTop: '20px' }}
/>
<TextField
 label="Phone Number"
 value={phoneNumber}
 onChange={(e) => setPhoneNumber(e.target.value)}
 variant="outlined"
 fullWidth
 style={{ marginTop: '20px' }}
/>
<Typography variant="body1" align="center">Quantity: {quantity}</Typography>          
            <Typography variant="body1" align="center">Total Price: ${calculateTotalPrice()}</Typography>
            <Button variant="contained" color="primary" fullWidth onClick={handlePlaceOrder}>
              Place Order
            </Button><br/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default BuyNow;
