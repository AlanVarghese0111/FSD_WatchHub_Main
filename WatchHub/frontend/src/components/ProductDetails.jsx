import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  styled,
  Button,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Add, Remove } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  marginTop: 20,
  marginBottom: 20,
  background: '#f9f9f9',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
}));
const StyledButton = styled(Button)({
    backgroundColor: "#333",
    color: "white",
    height: 36,
    padding: "25px",
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
    "&:hover": {
      backgroundColor: "brown",
      color: "white",
    },
  });

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/vieweachproduct/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const id = user._id;
      const firstName = user.firstName;
      const lastName = user.lastName;
      const address = user.address;

      await axios.post('http://localhost:5000/api/cart/addcart', {
        itemName: product.name,
        price: product.price,
        quantity: quantity,
        id,
        firstName,
        lastName,
        address,
      });
      console.log('Product added to cart:', product.name);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleBuyNow = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate(`/buynow/${productId}/${quantity}`);
      console.log('Buy now clicked for product ID:', productId);
    } else {
      navigate('/login');
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <StyledCard>
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        style={{ objectFit: 'contain', height: '300px' }}
      />
      <CardContent>
        <Typography variant="h4" component="h2" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Description: {product.description}
        </Typography>
        <Typography variant="h5">Price: {product.price}</Typography>

        <br />

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" style={{ marginRight: '10px' }}>
            Quantity:
          </Typography>
          <IconButton onClick={handleDecrement} size="small">
            <Remove />
          </IconButton>
          <FormControl>
            <Select value={quantity} onChange={(e) => setQuantity(e.target.value)} displayEmpty>
              {[...Array(10)].map((_, index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={handleIncrement} size="small">
            <Add />
          </IconButton>
        </div>

        <br />

        <StyledButton
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
          onClick={handleAddToCart}
          style={{
            backgroundColor: '#333',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#8B4513', // Brown color
            },
          }}
        >
          Add to Cart
        </StyledButton>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <StyledButton
          variant="contained"
          startIcon={<ShoppingBasketIcon />}
          onClick={handleBuyNow}
          style={{
            backgroundColor: '#333',
            color: '#fff',
           
          }}
        >
          Buy Now
        </StyledButton>
      </CardContent>
    </StyledCard>
  );
};

export default ProductDetails;
