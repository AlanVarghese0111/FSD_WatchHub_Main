import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { Typography, Button, Card, CardContent, CardMedia, Grid, FormControl, InputLabel, Select, MenuItem, CardActionArea, CardActions } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styled from '@emotion/styled';

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
    const { category } = useParams(); // Fetching category from route params
    const { addToCart } = useCart();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/product/viewproductsbycategory/${category}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products by category:', error);
            }
        };

        fetchProductsByCategory();
    }, [category]); // Ensure useEffect runs when category changes

    const handleQuantityChange = (productId, quantity) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: quantity,
        }));
    };

    const handleAddToCart = async (product) => {
        try {
            const isAuthenticated = localStorage.getItem('isAuthenticated');
            if (isAuthenticated === 'true') {
                const userId = localStorage.getItem('userId');
                const quantity = quantities[product._id] || 1;

                // Send a POST request to add the item to the cart
                const response = await fetch(`http://localhost:5000/api/cartItem/add-to-cart/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userId,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: quantity,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to add product to cart');
                }

                console.log('Product added to cart:', product.name);

                // Redirect to cart page with userId as parameter
                navigate(`/cart/${userId}`);
            } else {
                // Redirect to login if not authenticated
                if (location.pathname !== '/login') {
                    navigate('/login');
                }
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleViewProduct = (productId) => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated === 'true') {
            navigate(`/productdetails/${productId}`);
            console.log('View product clicked for product ID:', productId);
        } else {
            if (location.pathname !== '/login') {
                navigate('/login');
            }
        }
    };

    const handleBuyNow = (productId, quantity) => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated === 'true') {
            navigate(`/buynow/${productId}/${quantity}`);
            console.log('Buy now clicked for product ID:', productId, 'with quantity:', quantity);
        } else {
            if (location.pathname !== '/login') {
                navigate('/login');
            }
        }
    };

    return (
        <StyledGridContainer container spacing={3}>
            {products.map(product => (
                <Grid item key={product._id} xs={4}>
                    <StyledCard>
                        <CardActionArea onClick={() => handleViewProduct(product._id)}>
                            <CardMedia
                                component="img"
                                image={product.image}
                                alt={product.name}
                                style={{ objectFit: 'contain', height: '300px', width: '100%' }}
                            />
                        </CardActionArea>
                        <CardContent style={{ height: '100%' }}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                {product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}
                            </Typography>
                            <ProductInfoTypography variant="h6">
                                Price: {product.price}
                            </ProductInfoTypography>
                            <FormControl style={{ marginTop: '15px' }}>
                                <InputLabel id={`quantity-label-${product._id}`}>Quantity</InputLabel>
                                <Select
                                    labelId={`quantity-label-${product._id}`}
                                    id={`quantity-select-${product._id}`}
                                    value={quantities[product._id] || 1}
                                    onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                                    style={{
                                        minWidth: '150px',
                                        height: '5vh',
                                        backgroundColor: '#eee',
                                        borderRadius: '20px',
                                        color: '#333',
                                        marginTop: '25px',
                                    }}
                                >
                                    {[...Array(10).keys()].map(index => (
                                        <MenuItem key={index + 1} value={index + 1}>
                                            {index + 1}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </CardContent>
                        <CardActions style={{ justifyContent: 'space-between', padding: '6px' }}>
                            <StyledButton
                                size="small"
                                onClick={() => handleAddToCart(product)}
                                startIcon={<AddShoppingCartIcon />}
                            >
                                Add to Cart
                            </StyledButton>
                            <StyledButton
                                size="small"
                                onClick={() => handleBuyNow(product._id, quantities[product._id] || 1)}
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
