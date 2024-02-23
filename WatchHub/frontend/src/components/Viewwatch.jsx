import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
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
  minWidth: '100px',
  height: '40px',
  borderRadius: '20px',
  border: '1px solid #555',
  padding: '8px',
  color: '#333',
  backgroundColor: '#fff',
  '&:hover': {
    border: '1px solid #555',
    backgroundColor: '#555',
    color: '#fff',
  },
  '&:focus': {
    border: '1px solid #777',
    backgroundColor: '#555',
    color: '#fff',
  },
});

const QuantityMenuItem = styled(MenuItem)({
  fontSize: '14px',
});

const StyledButton = styled(Button)({
  backgroundColor: '#333',
  color: 'white',
  height: 36,
  padding: '25px', 
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
  '&:hover': {
    backgroundColor: 'brown',
    color: 'white',
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 300,
  margin: 'auto', 
  backgroundPosition: 'contain',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(0.95)',
  },
}));

const StyledGridContainer = styled(Grid)({
  padding: '20px',
});

const ProductInfoTypography = styled(Typography)({
  marginBottom: '10px',
});

const Viewwatch = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { category } = useParams();
  const { addToCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/viewproductsbycategory/${category}`);
        setProducts(response.data);
        const initialQuantities = {};
        response.data.forEach((product) => {
          initialQuantities[product._id] = 1;
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

  const handleAddToCart = async (product) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const id = user._id;
      const firstName = user.firstName;
      const lastName = user.lastName;
      const address = user.address;

      await axios.post('http://localhost:5000/api/cart/addcart', {
        itemName: product.name,
        price: product.price,
        quantity: quantities[product._id],
        id,
        firstName,
        lastName,
        address,
      });
      addToCart({ ...product, quantity: quantities[product._id] });
      console.log('Product added to cart:', product.name);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleBuyNow = (productId) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      const quantity = quantities[productId];
      navigate(`/buynow/${productId}/${quantity}`);
      console.log('Buy now clicked for product ID:', productId);
    } else {
      if (location.pathname !== '/login') {
        navigate('/login');
      }
    }
  };

  return (
    <StyledGridContainer container spacing={3}>
      {products.map((product) => (
        <Grid item key={product._id} xs={4} >
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
              <ProductInfoTypography variant="body2" color="textSecondary" gutterBottom>
                Description: {product.description}
              </ProductInfoTypography>
              <ProductInfoTypography variant="body1">
                Price: {product.price}
              </ProductInfoTypography>
              <ProductInfoTypography variant="body1">
                Stock: {product.stock}
              </ProductInfoTypography>
              <FormControl style={{ marginTop: '15px' }}>
                <InputLabel id={`quantity-label-${product._id}`}>Quantity</InputLabel>
                <QuantitySelect
                  labelId={`quantity-label-${product._id}`}
                  id={`quantity-select-${product._id}`}
                  value={quantities[product._id] || 1}
                  onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                  variant="outlined"
                  style={{ backgroundColor: '#f0f0f0', marginTop: '15px' }}
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
    </StyledGridContainer>
  );
};

export default Viewwatch;
