import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Grid, Paper, styled, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const StyledPaper = styled(Paper)({
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const Userdata = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);

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

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Implement logic to send updated user data to backend
    try {
      const response = await fetch(`http://localhost:5000/api/auth/updateuser/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        setUserData(data);
        setEditMode(false);
      } else {
        console.error('Error updating user data:', data.error);
        // Handle error updating user data
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      // Handle error updating user data
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <StyledPaper elevation={3}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            <span style={{ marginRight: '10px' }}>User Details</span>
            {!editMode && <EditIcon onClick={handleEditClick} style={{ cursor: 'pointer' }} />}
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
            {editMode && (
              <Grid item xs={12}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={userData.address}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Pincode"
                    name="pincode"
                    value={userData.pincode}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Land Mark"
                    name="landmark"
                    value={userData.landmark}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                  />
                  {/* Add more fields as needed */}
                  <Button type="submit" variant="contained" color="primary">Save</Button>
                </form>
              </Grid>
            )}
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
