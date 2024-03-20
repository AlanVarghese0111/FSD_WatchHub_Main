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
  Grid,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  backgroundColor: "#ffffff",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
}));

const StyledFormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const StyledFormControl = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1),
  width: "100%",
  maxWidth: "300px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "#333",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "brown",
  },
}));

const CartBuynow = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    pincode: "",
    landmark: "",
    phoneNumber: "",
    userId: "",
  });
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
    fetchUserDetails();
  }, []);

  const fetchCartItems = async () => {
    try {
      const userId = localStorage.getItem("userId");
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

  const fetchUserDetails = () => {
    const storedFirstName = localStorage.getItem("firstName") || "";
    const storedLastName = localStorage.getItem("lastName") || "";
    const storedAddress = localStorage.getItem("address") || "";
    const storedPincode = localStorage.getItem("pincode") || "";
    const storedLandmark = localStorage.getItem("landmark") || "";
    const storedPhoneNumber = localStorage.getItem("phoneNumber") || "";
    const storedUserId = localStorage.getItem("userId") || "";

    setUserDetails({
      firstName: storedFirstName,
      lastName: storedLastName,
      address: storedAddress,
      pincode: storedPincode,
      landmark: storedLandmark,
      phoneNumber: storedPhoneNumber,
      userId: storedUserId,
    });
  };

  const handlePlaceOrder = async () => {
    try {
      const userId = localStorage.getItem("userId");

      // Collect all productIds and quantities from cartItems
      const orders = cartItems.map((item) => ({
        productId: item.productId,
        userId: userId,
        image: item.image,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        address: userDetails.address,
        pincode: userDetails.pincode,
        landmark: userDetails.landmark,
        phoneNumber: userDetails.phoneNumber,
        quantity: item.quantity,
      }));

      console.log("Sending orders:", orders); // Log the orders being sent

      const response = await fetch(
        "http://localhost:5000/api/order/placeordercart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orders }), // Send all orders at once
        }
      );

      if (!response.ok) {
        throw new Error("Failed to place orders");
      }

      // Clear cart items after successfully placing orders
      setCartItems([]);
      navigate("/");
      alert("All orders have been placed successfully!");
    } catch (error) {
      console.error("Error placing orders:", error);
      alert("Failed to place orders. Please try again later.");
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await fetch(`http://localhost:5000/api/cartItem/remove/${itemId}`, {
        method: "DELETE",
      });
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemId)
      );
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
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
        </>
      )}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6}>
          {/* Product details section */}
        </Grid>
        <Grid item xs={12}>
          <StyledPaper elevation={3}>
            <StyledFormContainer>
              <Typography variant="h5" gutterBottom>
                Enter Your Details
              </Typography>
              <Divider style={{ marginBottom: "16px", width: "100%" }} />
              <StyledFormControl
                label="First Name"
                style={{ width: "150%" }}
                value={userDetails.firstName}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, firstName: e.target.value })
                }
                variant="outlined"
                required
              />

              <StyledFormControl
                label="Last Name"
                value={userDetails.lastName}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, lastName: e.target.value })
                }
                variant="outlined"
                required
              />
              <StyledFormControl
                label="Address"
                value={userDetails.address}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, address: e.target.value })
                }
                variant="outlined"
                required
              />
              <StyledFormControl
                label="Pincode"
                value={userDetails.pincode}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, pincode: e.target.value })
                }
                variant="outlined"
              />
              <StyledFormControl
                label="Landmark"
                value={userDetails.landmark}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, landmark: e.target.value })
                }
                variant="outlined"
              />
              <StyledFormControl
                label="Phone Number"
                value={userDetails.phoneNumber}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    phoneNumber: e.target.value,
                  })
                }
                variant="outlined"
              />
              {/* Quantity and total price */}
              <StyledButton
                variant="contained"
                color="primary"
                fullWidth
                onClick={handlePlaceOrder}
              >
                Place Order
              </StyledButton>
            </StyledFormContainer>
          </StyledPaper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CartBuynow;
