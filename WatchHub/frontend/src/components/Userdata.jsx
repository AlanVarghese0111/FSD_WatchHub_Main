import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Grid, Paper, styled } from '@mui/material';

const StyledPaper = styled(Paper)({
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const Userdata = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data based on the stored user ID
    const userId = localStorage.getItem('userId');
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/fetchuser/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setUserData(data);
        } else {
          console.error('Error fetching user data:', data.error);
          // Handle error fetching user data
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error fetching user data
      }
    };

    fetchUserData();
  }, []);

  return (
    <StyledPaper elevation={3}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            User Details
          </Typography>
        </Grid>
        {userData ? (
          <>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>First Name:</strong> {userData.firstName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Last Name:</strong> {userData.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Email:</strong> {userData.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Address:</strong> {userData.address}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Pincode:</strong> {userData.pincode}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Landmark:</strong> {userData.landmark}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Phone Number:</strong> {userData.phoneNumber}
              </Typography>
            </Grid>
            {/* Add more user details here */}
          </>
        ) : (
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <CircularProgress />
          </Grid>
        )}
      </Grid>
    </StyledPaper>
  );
};

export default Userdata;
