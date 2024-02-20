import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import { Button } from '@mui/material';

const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const StyledButton = styled(Button)`
  && {
    padding: 12px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: brown;
    }
  }
`;

const Message = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
`;

const LockIconWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Set user authentication status and user data in localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(data.user));

        // Extract user ID and store it in localStorage
        // const userId = data.user._id;
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userId', data.user._id);
        localStorage.setItem('firstName', data.user.firstName);
localStorage.setItem('lastName', data.user.lastName);
localStorage.setItem('address', data.user.address);




        // Check if the user is an admin
        if (data.user.email === 'admin@gmail.com') {
          console.log('Admin logged in');
        } else {
          console.log('User logged in');
        }

        // Redirect the user
        if (data.user.email === 'admin@gmail.com') {
          navigate('/admin');
        } else {
          navigate('/');
          window.location.reload();
        }

        // Show login success message
        alert('Login Successful : Welcome To WatchHub');
      } else {
        console.error('Error during login:', data.error);
        // Show login error message
        alert('Check email and password and try again: ' + data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Show login error message
      alert('Error during login: ' + error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <LockIconWrapper>
        <LockIcon style={{ fontSize: '48px', color: '#333', marginBottom: '10px' }} />
      </LockIconWrapper>
      <Title>Welcome Back!</Title>
      <Form onSubmit={handleLogin}>
        <Label htmlFor="email">Email ID:</Label>
        <Input type="email" id="email" name="email" onChange={handleChange} required />

        <Label htmlFor="password">Password:</Label>
        <Input type="password" id="password" name="password" onChange={handleChange} required />

        <StyledButton type="submit">Login</StyledButton>

        <Message>
          Don't have an account? <Link to="/signup" style={{ textDecoration: 'none' }}>Signup</Link>
        </Message>
      </Form>
    </Container>
  );
};

export default Login;
