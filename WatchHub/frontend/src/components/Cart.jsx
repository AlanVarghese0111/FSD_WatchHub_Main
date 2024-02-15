// src/components/Cart.jsx

import React from 'react';
import { Typography, Button, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import { useCart } from './CartContext';

const CartItem = ({ item }) => (
  <ListItem alignItems="flex-start" style={{ padding: '20px 0', borderBottom: '1px solid #ddd' }}>
    <ListItemAvatar>
      <Avatar alt={item.name} src={item.image} />
    </ListItemAvatar>
    <ListItemText
      primary={item.name}
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
  const { cartItems } = useCart();

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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
            onClick={() => alert('Checkout functionality coming soon!')}
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
