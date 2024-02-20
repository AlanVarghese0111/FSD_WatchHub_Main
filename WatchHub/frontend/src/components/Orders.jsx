import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, styled, Button } from '@mui/material';

// Define styles using the styled API
const StyledCard = styled(Card)({
  marginBottom: theme => theme.spacing(4), // Increased margin for better separation
  backgroundColor: '#ffffff', // Changed background color to white
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Added box shadow for depth
  transition: 'transform 0.2s', // Added transition for smoother hover effect
  '&:hover': {
    transform: 'scale(1.05)', // Scale up card on hover for interactive feel
  },
});

const useStyles = {
  root: {
    padding: theme => theme.spacing(3),
  },
  title: {
    marginBottom: theme => theme.spacing(4), // Increased margin for better separation
    fontWeight: 'bold', // Made title text bold
    color: '#333333', // Changed title text color to dark gray
  },
  button: {
    marginTop: theme => theme.spacing(4), // Added margin to the button
  },
};

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/order/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={useStyles.root}>
      <Typography variant="h3" className={useStyles.title} gutterBottom>Orders</Typography>
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order._id}>
            <StyledCard>
              <CardContent>
                <Typography variant="h5">Order ID: {order._id}</Typography>
                <Typography variant="body1">Customer Name: {order.firstName}</Typography>
                <Typography variant="body2">Address: {order.address}</Typography>
                <Typography variant="body2">Phone Number: {order.phoneNumber}</Typography>
                <Typography variant="body2">Quantity: {order.quantity}</Typography>
                {/* Add more details about the order as needed */}

              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Orders;
