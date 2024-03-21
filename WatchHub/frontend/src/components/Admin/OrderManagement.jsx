import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Select,
  MenuItem,
  Container,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import Sidebar from "./Sidebar"; // Import the Sidebar component

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/order/orders");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleEditOrder = (orderId) => {
    setEditingOrderId(orderId);
  };

  const handleStatusChange = async (orderId) => {
    try {
      // Send a PUT request to update the order status
      const response = await fetch(
        `http://localhost:5000/api/order/editstatus/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
      // Refresh orders after status update
      await fetchOrders(); // Wait for fetchOrders to complete
      setEditingOrderId(null); // Close the edit mode
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div>
      <Sidebar /> {/* Include the Sidebar component */}
      <div style={{ marginLeft: 240, padding: "20px" }}>
        {" "}
        {/* Adjust the margin to accommodate the sidebar */}
        <header
          style={{
            backgroundColor: "#333",
            color: "#fff",
            padding: "20px",
            textAlign: "center",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
            View Orders
          </h1>
          <Typography variant="subtitle1">
            Explore and manage all Orders.
          </Typography>
        </header>
        <Container>
          <Grid container spacing={3}>
            {orders
              .filter((order) => order.status !== "cancelled") // Filter out cancelled orders
              .map((order) => (
                <Grid item xs={12} key={order._id}>
                  <Paper elevation={3} style={{ padding: "20px" }}>
                    <Typography variant="h5">Order ID: {order._id}</Typography>
                    <Typography variant="body1">
                      Product ID: {order.productId}
                    </Typography>
                    <Typography variant="body1">
                      First Name: {order.firstName}
                    </Typography>
                    <Typography variant="body1">
                      Last Name: {order.lastName}
                    </Typography>
                    <Typography variant="body1">
                      Address: {order.address}
                    </Typography>
                    <Typography variant="body1">
                      Pincode: {order.pincode}
                    </Typography>
                    <Typography variant="body1">
                      Landmark: {order.landmark}
                    </Typography>
                    <Typography variant="body1">
                      Quantity: {order.quantity}
                    </Typography>
                    <Typography variant="body1">
                      Phone Number: {order.phoneNumber}
                    </Typography>
                    <Typography variant="body1">
                      Status: {order.status}
                    </Typography>
                    {editingOrderId === order._id ? (
                      <div style={{ marginTop: "10px" }}>
                        <Select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          fullWidth
                          variant="outlined"
                          size="small"
                          style={{ marginBottom: "10px" }}
                        >
                          <MenuItem value="dispatched">Dispatched</MenuItem>
                          <MenuItem value="shipped">Shipped</MenuItem>
                          <MenuItem value="delivered">Delivered</MenuItem>
                        </Select>
                        <Button
                          variant="contained"
                          onClick={() => handleStatusChange(order._id)}
                          size="small"
                          style={{ backgroundColor: "#4caf50", color: "#fff" }}
                        >
                          Save
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => handleEditOrder(order._id)}
                        size="small"
                        style={{
                          backgroundColor: "#f57c00",
                          color: "#fff",
                          marginTop: "10px",
                        }}
                      >
                        Edit
                      </Button>
                    )}
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default OrderManagement;
