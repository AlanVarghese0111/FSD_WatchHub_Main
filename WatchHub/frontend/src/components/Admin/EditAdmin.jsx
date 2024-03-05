// EditAdmin.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress, TextField, Button, Typography, Grid, Paper } from "@mui/material";
import Sidebar from "./Sidebar"; // Import the Sidebar component

const EditAdmin = () => {
  const { userId } = useParams();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/fetchuser/${userId}`
        );
        setAdmin(response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setAddress(response.data.address);
        setPincode(response.data.pincode);
        setLandmark(response.data.landmark);
        setPhoneNumber(response.data.phoneNumber);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin details:", error);
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, [userId]);

  const handleUpdateAdmin = async () => {
    try {
      // Send a PUT request to update admin details
      const response = await axios.put(
        `http://localhost:5000/api/auth/updateuser/${userId}`,
        {
          firstName,
          lastName,
          address,
          pincode,
          landmark,
          phoneNumber,
        }
      );
      console.log("Admin details updated:", response.data);
      
      // Display an alert after successful update
      alert("Admin details updated successfully!");
  
      // Redirect to the view all admins page or any other appropriate page
      // You can use React Router's useHistory hook to redirect
    } catch (error) {
      console.error("Error updating admin details:", error);
    }
  };
  

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Sidebar /> {/* Include the Sidebar component */}
      <div style={{ marginLeft: 240, padding: '20px' }}> {/* Adjust the margin to accommodate the sidebar */}
      <header style={{ backgroundColor: '#333', color: '#fff', padding: '20px', textAlign: 'center', borderRadius: '8px', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Edit Admin Profile</h1>
        </header>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleUpdateAdmin} 
          style={{ marginTop: '20px', backgroundColor: '#333', color: '#fff', '&:hover': { backgroundColor: 'brown' } }}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default EditAdmin;
