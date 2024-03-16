import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const CartBuynow = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const userId = "yourUserId"; // Replace 'yourUserId' with the actual user ID
      const response = await fetch(
        `http://localhost:5000/api/cartItem/cartitems/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const data = await response.json();
      setCartItems(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setLoading(false);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handlePlaceOrder = async () => {
    try {
      const userId = "yourUserId"; // Replace 'yourUserId' with the actual user ID
      const productIds = cartItems.map((item) => item.productId);

      const response = await fetch("http://localhost:5000/api/cartItem/cartbuynow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          products: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Order placed successfully!");
        console.log("Order details:", responseData);
        alert("Your order has been placed successfully!");
        // Clear cart items after successful purchase
        setCartItems([]);
        navigate("/"); // Navigate to home page or any other page
      } else {
        console.error("Error placing order:", responseData);
        alert("Failed to place order. Please try again later.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again later.");
    }
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

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Paper style={{ padding: "20px", margin: "20px auto", maxWidth: "800px" }}>
      <Typography variant="h4" gutterBottom>
        Your Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty</Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <ListItem
                key={item._id}
                alignItems="flex-start"
                style={{ padding: "20px 0", borderBottom: "1px solid #ddd" }}
              >
                <ListItemAvatar>
                  <Avatar alt={item.name} src={item.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        ₹{item.price.toFixed(2)}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                      >
                        {" — Quantity: " + item.quantity}
                      </Typography>
                    </>
                  }
                />
                <Button onClick={() => handleRemoveItem(item._id)}>
                  <DeleteIcon />
                </Button>
              </ListItem>
            ))}
          </List>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="h6" gutterBottom>
            Total: ₹{getTotalPrice().toFixed(2)}
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={handlePlaceOrder}
            style={{ marginTop: "20px" }}
          >
            Place Order
          </Button>
        </>
      )}
    </Paper>
  );
};

export default CartBuynow;
