import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid, Button, Avatar, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to navigate to the edit page
import Sidebar from './Sidebar'; // Import the Sidebar component

// Header component
const ViewAllUsersHeader = () => (
  <header style={{
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
    borderRadius: '8px',
    marginBottom: '20px',
  }}>
    <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>View All Users</h1>
    <Typography variant="subtitle1">Explore and manage all users.</Typography>
  </header>
);

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch users from the backend API
        const response = await fetch('http://localhost:5000/api/auth/viewusers');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        // Sort users array to display admin user first
        const sortedUsers = data.sort((a, b) => {
          if (a.email === 'admin@gmail.com') return -1; // admin user comes first
          if (b.email === 'admin@gmail.com') return 1; // admin user comes first
          return 0; // keep other users in their original order
        });
        setUsers(sortedUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle error
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    // Display confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    if (!confirmDelete) {
      // If user cancels deletion, return
      return;
    }

    try {
      // Send a delete request to the backend API
      const response = await fetch(`http://localhost:5000/api/auth/deleteusers/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Remove the deleted user from the users array
      setUsers(users.filter((user) => user._id !== userId));

      // Display success alert
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error
    }
  };

  const handleEditUser = (userId) => {
    // Navigate to the edit page with the user ID as a parameter
    navigate(`/editadmin/${userId}`);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f9f9f9' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main
        className="right-panel"
        style={{
          width: 'calc(100% - 240px)', // Adjust width to accommodate the sidebar
          height: '100%',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: 'white',
        }}
      >
        {/* Header */}
        <ViewAllUsersHeader />

        {/* Main content of ViewAllUsers component */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        ) : (
          users.map((user) => (
            <Paper key={user._id} elevation={3} style={{ margin: '20px', padding: '20px' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Avatar
                    alt={`${user.firstName} ${user.lastName}`}
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 100, height: 100, marginRight: 2 }}
                  />
                  <Typography variant="h5" gutterBottom>
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Email: {user.email}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Address: {user.address}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Pincode: {user.pincode}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Landmark: {user.landmark}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Phone Number: {user.phoneNumber}
                  </Typography>
                  {user.email === 'admin@gmail.com' && (
                    <Typography variant="body1" gutterBottom style={{ fontWeight: 'bold', color: 'green' }}>
                      Role: Admin
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} container justifyContent="flex-end">
                  {user.email === 'admin@gmail.com' && (
                    <Button variant="contained" color="primary" onClick={() => handleEditUser(user._id)}>
                      Edit
                    </Button>
                  )}
                  {user.email !== 'admin@gmail.com' && (
                    <Button variant="contained" color="error" onClick={() => handleDeleteUser(user._id)}>
                      Delete
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Paper>
          ))
        )}
      </main>
    </div>
  );
};

export default ViewAllUsers;
