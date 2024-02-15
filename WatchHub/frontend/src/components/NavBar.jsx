import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Paper,
  InputBase,
  Menu,
  MenuItem,
} from '@mui/material';
import WatchHubIcon from './assets/WatchHubIcon.jpeg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useCart } from './CartContext';

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const { cartItems } = useCart();
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  const handleLogout = () => {
    console.log('User logged out'); // Console log for logout
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setAnchorEl(null);
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    // Redirect to /userdata page
    navigate('/userdata');
    // Close the profile menu
    setAnchorEl(null);
  };

  return (
    <AppBar style={{ backgroundColor: '#333', zIndex: 1000, position: 'fixed' }}>
      <Toolbar>
        <IconButton component={Link} to="/" edge="start" color="inherit" aria-label="menu">
          <img src={WatchHubIcon} alt="Watch Hub Icon" style={{ borderRadius: '5px', width: '32px', height: '32px' }} />
        </IconButton>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{
            flex: 1,
            textDecoration: 'none',
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          WatchHub
        </Typography>

        <Paper component="form" sx={{ p: '2', display: 'flex', width: '60%', alignItems: 'center' }}>
          <InputBase
            placeholder="Search"
            inputProps={{ 'aria-label': 'search products' }}
            sx={{ ml: 1, flex: 1, color: '#000' }}
          />
          <IconButton type="submit" aria-label="search" sx={{ color: '#000' }}>
            <SearchIcon />
          </IconButton>
        </Paper>

        <div style={{ display: 'flex' }}>
          <Button component={Link} to="/" color="inherit" style={{ margin: '0 10px' }}>
            Home
          </Button>
          <Button component={Link} to="/about" color="inherit" style={{ margin: '0 10px' }}>
            About
          </Button>
          {isAuthenticated && (
            <>
              <IconButton onClick={handleProfileMenuOpen} color="inherit" style={{ margin: '0 10px' }}>
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
              <IconButton component={Link} to="/cart" color="inherit" style={{ margin: '0 10px' }}>
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </>
          )}
          {!isAuthenticated && (
            <Button component={Link} to="/login" color="inherit" style={{ margin: '0 10px' }}>
              <LoginIcon />
              Login
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
