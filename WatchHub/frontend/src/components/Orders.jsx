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
  const [confirmOrderId, setConfirmOrderId] = useState(null);

  const fetchUserOrders = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`http://localhost:5000/api/order/userorders/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user orders');
      }
      const data = await response.json();

      // Fetch product details for each order
      const ordersWithProducts = await Promise.all(
        data.map(async (order) => {
          const productResponse = await fetch(`http://localhost:5000/api/product/vieweachproduct/${order.productId}`);
          const productData = await productResponse.json();
          return { ...order, product: productData };
        })
      );

      setOrders(ordersWithProducts);
    } catch (error) {
      console.error('Error fetching user orders:', error);
    }
  };

  const handleCancelOrder = (orderId) => {
    setConfirmOrderId(orderId);
  };

  const handleConfirmCancelOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/order/cancelorder/${orderId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }
      // Remove the canceled order from the list
      setOrders(orders.filter(order => order._id !== orderId));
      // Display success alert
      alert('Order canceled successfully');
    } catch (error) {
      console.error('Error canceling order:', error);
    } finally {
      // Reset the confirmOrderId state
      setConfirmOrderId(null);
    }
  };

  const handleCancelConfirmCancelOrder = () => {
    // Reset the confirmOrderId state
    setConfirmOrderId(null);
  };

  const handleTrackOrder = (orderId) => {
    // Implement track order logic here
    console.log(`Tracking Order ${orderId}`);
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <div style={useStyles.root}>
      <Typography variant="h3" className={useStyles.title} gutterBottom>
        Orders
      </Typography>
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order._id}>
            <StyledCard>
              <CardContent>
                <Typography variant="h5">Order ID: {order._id}</Typography>
                <img src={order.product.image} alt={`Order ${order._id}`} style={{ maxWidth: '100%', height: 'auto' }} />
                <Typography variant="body1">Product Name: {order.product.name}</Typography>
                <Typography variant="body1">Description: {order.product.description}</Typography>
                <Typography variant="body1">Price: {order.product.price}</Typography>
                <Typography variant="body1">Category: {order.product.category}</Typography>
                <Typography variant="body2">Quantity: {order.quantity}</Typography>
                {/* Add more details about the order as needed */}
                <Button
                  variant="outlined"
                  color="secondary"
                  style={useStyles.button}
                  onClick={() => handleCancelOrder(order._id)}
                >
                  Cancel Order
                </Button>
                {/* Display confirmation button only for the selected order */}
                {confirmOrderId === order._id && (
                  <>
                    <Button
                      variant="outlined"
                      color="secondary"
                      style={useStyles.button}
                      onClick={() => handleConfirmCancelOrder(order._id)}
                    >
                      Confirm Cancel
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      style={useStyles.button}
                      onClick={handleCancelConfirmCancelOrder}
                    >
                      Cancel
                    </Button>
                  </>
                )}
                <Button
                  variant="outlined"
                  color="primary"
                  style={useStyles.button}
                  onClick={() => handleTrackOrder(order._id)}
                >
                  Track Order
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Orders;
