import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({ item, onRemoveItem }) => (
  <ListItem
    alignItems="flex-start"
    style={{ padding: "20px 0", borderBottom: "1px solid #ddd" }}
  >
    <ListItemAvatar>
      <Avatar alt={item.itemName} src={item.image} />
    </ListItemAvatar>
    <ListItemText
      primary={item.name}
      secondary={
        <React.Fragment>
          <Typography component="span" variant="body2" color="textPrimary">
            ₹{item.price.toFixed(2)}
          </Typography>
          <Typography component="span" variant="body2" color="textSecondary">
            {" — Quantity: " + item.quantity}
          </Typography>
        </React.Fragment>
      }
    />
    <Button onClick={() => onRemoveItem(item._id)}>
      <DeleteIcon />
    </Button>
  </ListItem>
);

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems(userId);
  }, [userId]);

  const fetchCartItems = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/cartItem/cartitems/${userId}`
      );
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleProceedToCheckout = () => {
    // Extracting product IDs from cartItems
    const productIds = cartItems.map((item) => item._id);
    // Convert array of IDs into a comma-separated string
    const productIdsString = productIds.join(",");
    // Navigating to the checkout page with product IDs in the URL
    navigate(`/cartbuynow/${productIdsString}`);
  };

  const handleRemoveItem = async (itemId) => {
    try {
      // Send request to remove item from the cart
      await fetch(`http://localhost:5000/api/cartItem/remove/${itemId}`, {
        method: "DELETE",
      });
      // Remove the deleted item from cartItems state
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemId)
      );
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <Paper style={{ padding: "20px", margin: "20px auto", maxWidth: "800px" }}>
      <Typography variant="h4" gutterBottom>
        Your Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty</Typography>
      ) : (
        <React.Fragment>
          <List>
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onRemoveItem={handleRemoveItem}
              />
            ))}
          </List>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="h6" gutterBottom>
            Total: ₹{getTotalPrice().toFixed(2)}
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={handleProceedToCheckout}
            style={{ marginTop: "20px" }}
          >
            Proceed to Checkout
          </Button>
        </React.Fragment>
      )}
    </Paper>
  );
};

export default Cart;
