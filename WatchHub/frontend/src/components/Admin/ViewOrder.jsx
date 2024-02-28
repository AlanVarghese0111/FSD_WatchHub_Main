import React, { useState, useEffect } from 'react';
import { Paper, Typography,CircularProgress } from '@mui/material';
import Sidebar from './Sidebar';

const ViewAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/order/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f9f9f9' }}>
      <Sidebar />
      <main className="right-panel" style={{ width: 'calc(100% - 240px)', height: '100%', padding: '20px', borderRadius: '8px', backgroundColor: 'white' }}>
        <header style={{ backgroundColor: '#333', color: '#fff', padding: '20px', textAlign: 'center', borderRadius: '8px', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>View All Orders</h1>
          <Typography variant="subtitle1">Explore and manage all orders.</Typography>
        </header>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        ) : (
          orders.map((order) => (
            <Paper key={order._id} elevation={3} style={{ margin: '20px', padding: '20px' }}>
              <Typography variant="h5" gutterBottom>Order ID: {order._id}</Typography>
              <Typography variant="body1" gutterBottom>Product ID: {order.productId}</Typography>
              <Typography variant="body1" gutterBottom>User ID: {order.userId}</Typography>
              {/* Add other order details here */}
            </Paper>
          ))
        )}
      </main>
    </div>
  );
};

export default ViewAllOrders;
