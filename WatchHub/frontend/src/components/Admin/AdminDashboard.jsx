import React from 'react';
import { Paper, Typography, Grid, Avatar, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import GroupIcon from '@mui/icons-material/Group';
import StoreIcon from '@mui/icons-material/Store';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const AdminDashboard = ({ totalUsers, totalProducts, totalOrders }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f9f9f9' }}>
      <Sidebar />
      <main className="right-panel" style={{ width: '80%', height: '100%', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <header style={{ backgroundColor: '#333', color: '#fff', padding: '20px', textAlign: 'center', borderRadius: '8px', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Welcome to Admin Dashboard</h1>
          <Typography variant="subtitle1">Manage your products, users, and analytics with ease.</Typography>
        </header>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', borderRadius: '16px', backgroundColor: '#3f51b5', color: '#fff' }}>
              <Avatar style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', width: '80px', height: '80px', margin: '0 auto 20px auto' }}>
                <GroupIcon style={{ fontSize: '3rem' }} />
              </Avatar>
              <Typography variant="h6" gutterBottom>Total Users</Typography>
              <Typography variant="h3">{totalUsers}</Typography>
              <Button variant="contained" onClick={() => navigate('/viewusers')} color="primary">View All Users</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', borderRadius: '16px', backgroundColor: '#f50057', color: '#fff' }}>
              <Avatar style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', width: '80px', height: '80px', margin: '0 auto 20px auto' }}>
                <StoreIcon style={{ fontSize: '3rem' }} />
              </Avatar>
              <Typography variant="h6" gutterBottom>Total Products</Typography>
              <Typography variant="h3">{totalProducts}</Typography>
              <Button variant="contained" onClick={() => navigate('/viewproducts')} color="primary">View All Products</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', borderRadius: '16px', backgroundColor: '#4caf50', color: '#fff' }}>
              <Avatar style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', width: '80px', height: '80px', margin: '0 auto 20px auto' }}>
                <LocalMallIcon style={{ fontSize: '3rem' }} />
              </Avatar>
              <Typography variant="h6" gutterBottom>Total Orders</Typography>
              <Typography variant="h3">{totalOrders}</Typography>
              <Button variant="contained" onClick={() => navigate('/Ordersmanagement')} color="primary">View All Orders</Button>
            </Paper>
          </Grid>
        </Grid>

        <footer style={{ marginTop: '20px', textAlign: 'center', color: '#777' }}>
          <Box component="p">&copy; 2024 Admin Dashboard</Box>
        </footer>
      </main>
    </div>
  );
};

export default AdminDashboard;
