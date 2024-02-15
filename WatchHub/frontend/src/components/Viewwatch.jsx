import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartContext';
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const QuantitySelect = styled(Select)({
  minWidth: '150px',
  height: '30px',
  borderRadius: '10px',
  border: '1px solid #555',
  padding: '8px',
  color: '#333',
  backgroundColor: '#fff',
  '&:hover': {
    border: '1px solid #555',
    backgroundColor: '#555',
  },
  '&:focus': {
    border: '1px solid #777',
    backgroundColor: '#555',
  },
});


const QuantityMenuItem = styled(MenuItem)({
  fontSize: '14px',
});

const StyledButton = styled(Button)({
  backgroundColor: '#333',
  color: 'white',
  height: 36,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
  '&:hover': {
    backgroundColor: 'brown',
    color: 'white',
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 300,
  margin: 'auto',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const Viewwatch = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { category } = useParams();
  const { addToCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/viewproductsbycategory/${category}`);
        setProducts(response.data);
        // Initialize quantities state
        const initialQuantities = {};
        response.data.forEach((product) => {
          initialQuantities[product._id] = 1; // Set default quantity to 1
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const handleAddToCart = (product) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      addToCart({ ...product, quantity: quantities[product._id] });
      console.log('Product added to cart:', product.name);
    } else {
      if (location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
  };

  const handleBuyNow = (productId) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      // Continue with Buy Now functionality
      window.location.href = `/buynow/${productId}`;
      console.log('Buy now clicked for product ID:', productId);
    } else {
      // Redirect to login page if not logged in
      if (location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h2" gutterBottom>
        Products in {category} Category
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <StyledCard>
              <CardMedia
                component="img"
                height="250"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Description: {product.description}
                </Typography>
                <Typography variant="body1">
                  Price: {product.price}
                </Typography>
                <Typography variant="body1">
                  Stock: {product.stock}
                </Typography>
                <FormControl style={{ marginTop: '10px' }}>
                  <InputLabel id={`quantity-label-${product._id}`}>Quantity</InputLabel>
                  <QuantitySelect
                    labelId={`quantity-label-${product._id}`}
                    id={`quantity-select-${product._id}`}
                    value={quantities[product._id] || 1}
                    onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                    variant="outlined"
                    style={{ backgroundColor: '#f0f0f0' }}
                  >
                    {[...Array(product.stock).keys()].map((index) => (
                      <QuantityMenuItem key={index + 1} value={index + 1}>{index + 1}</QuantityMenuItem>
                    ))}
                  </QuantitySelect>
                </FormControl>
              </CardContent>
              <CardActions style={{ justifyContent: 'space-between', padding: '16px' }}>
                <StyledButton
                  size="small"
                  onClick={() => handleAddToCart(product)}
                  startIcon={<AddShoppingCartIcon />}
                >
                  Add to Cart
                </StyledButton>
                <StyledButton
                  size="small"
                  onClick={() => handleBuyNow(product._id)}
                  startIcon={<ShoppingCartIcon />}
                >
                  Buy Now
                </StyledButton>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Viewwatch;
