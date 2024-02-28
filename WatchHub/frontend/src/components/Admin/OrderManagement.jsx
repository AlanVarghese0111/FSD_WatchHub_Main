import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

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

  const handleEditOrder = (orderId) => {
    // Implement logic to navigate to edit order page with orderId
    // For example: navigate(`/editorder/${orderId}`);
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Order Management
      </Typography>
      {orders.map((order) => (
        <div key={order._id}>
          <Typography variant="h5">Order ID: {order._id}</Typography>
          <Typography variant="body1">Product ID: {order.productId}</Typography>
          <Typography variant="body1">Status: {order.status}</Typography>
          <Button variant="outlined" onClick={() => handleEditOrder(order._id)}>Edit</Button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default OrderManagement;
