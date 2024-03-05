import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
} from "@mui/material";

const CartBuynow = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = "yourUserId"; // Replace 'yourUserId' with the actual user ID
    const fetchCartItems = async () => {
      try {
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

    fetchCartItems();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h2" gutterBottom align="center">
        Cart Items
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1" align="center">
          Your cart is empty
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default CartBuynow;
