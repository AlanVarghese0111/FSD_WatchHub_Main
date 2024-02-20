import React, { useState, useEffect } from 'react';
import { Typography, Button, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({ item }) => (
  <ListItem alignItems="flex-start" style={{ padding: '20px 0', borderBottom: '1px solid #ddd' }}>
    <ListItemAvatar>
      <Avatar alt={item.itemName} src={item.image} />
    </ListItemAvatar>
    <ListItemText
      primary={item.itemName}
      secondary={
        <React.Fragment>
          <Typography component="span" variant="body2" color="textPrimary">
            ₹{item.price.toFixed(2)}
          </Typography>
          <Typography component="span" variant="body2" color="textSecondary">
            {' — Quantity: ' + item.quantity}
          </Typography>
        </React.Fragment>
      }
    />
  </ListItem>
);

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart items from backend API
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/cartitems');
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleProceedToCheckout = () => {
    navigate('/Buynow');
  };

  return (
    <Paper style={{ padding: '20px', margin: '20px auto', maxWidth: '800px' }}>
      <Typography variant="h4" gutterBottom>
        Your Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty</Typography>
      ) : (
        <React.Fragment>
          <List>
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </List>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="h6" gutterBottom>
            Total: ₹{getTotalPrice().toFixed(2)}
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={handleProceedToCheckout}
            style={{ marginTop: '20px' }}
          >
            Proceed to Checkout
          </Button>
        </React.Fragment>
      )}
    </Paper>
  );
};

export default Cart;
