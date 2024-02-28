import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';
import WatchHubIcon from './assets/WatchHubIcon.jpeg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useCart } from './CartContext';

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const { cartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  const handleLogout = () => {
    console.log('User logged out');
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setAnchorEl(null);
      sessionStorage.clear();
      localStorage.clear();
    }
  };

  const handleorderClick = () => {
    navigate('/Orders');
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/userdata');
    setAnchorEl(null);
  };

  return (
    <AppBar style={{ background: 'linear-gradient(45deg, #333, #000080)', zIndex: 1000, position: 'fixed' }}>
      <Toolbar>
        <IconButton component={Link} to="/" edge="start" color="inherit" aria-label="menu"  >
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
            fontFamily: "'Satisfy', cursive",
          }}
        >
          WatchHub
        </Typography>

        <div style={{ display: 'flex' }}>
           
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
                <MenuItem onClick={handleorderClick}>Orders</MenuItem>
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
