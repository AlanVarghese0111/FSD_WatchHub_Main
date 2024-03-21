import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
  Rating,
  TextField,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Add, Remove } from "@mui/icons-material";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  marginTop: 20,
  marginBottom: 20,
  background: "#f9f9f9",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
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
  const location = useLocation(); // Import useLocation hook
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/product/vieweachproduct/${productId}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/feedback/${productId}`
        );
        setFeedbackList(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (isAuthenticated === "true") {
            const userId = localStorage.getItem("userId");

            // Send a POST request to add the item to the cart
            const response = await axios.post(
                `http://localhost:5000/api/cartItem/add-to-cart/${userId}`,
                {
                    userId: userId,
                    productId: productId, // Include productId in the request body
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: quantity,
                }
            );

            console.log("Product added to cart:", product.name);
            console.log(response.data);

            // Redirect to cart page with userId as parameter
            navigate(`/cart/${userId}`);
        } else {
            // Redirect to login if not authenticated
            if (location.pathname !== "/login") {
                navigate("/login");
            }
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
    }
};

  
  

  const handleBuyNow = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      navigate(`/buynow/${productId}/${quantity}`);
      console.log("Buy now clicked for product ID:", productId);
    } else {
      navigate("/login");
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

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleRatingChange = (newValue) => {
    setRating(newValue);
  };

  const handleSubmitFeedback = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userName = `${user.firstName} ${user.lastName}`;

      const response = await axios.post("http://localhost:5000/api/feedback", {
        productId: productId,
        rating: rating,
        feedback: feedback,
        userName: userName, // Include the user's name
      });

      console.log("Feedback submitted successfully:", response.data);
      // Optionally, you can show a success message or perform other actions
      // Reset the feedback and rating states after submission
      setFeedback("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Optionally, you can show an error message or perform other actions
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
        style={{ objectFit: "contain", height: "300px" }}
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" style={{ marginRight: "10px" }}>
            Quantity:
          </Typography>
          <IconButton onClick={handleDecrement} size="small">
            <Remove />
          </IconButton>
          <FormControl>
            <Select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              displayEmpty
            >
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
        >
          Add to Cart
        </StyledButton>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <StyledButton
          variant="contained"
          startIcon={<ShoppingBasketIcon />}
          onClick={handleBuyNow}
        >
          Buy Now
        </StyledButton>
        <br />
        <br />
        <Typography variant="h6" gutterBottom>
          Leave Feedback:
        </Typography>
        <Rating
          name="feedback-rating"
          value={rating}
          onChange={(event, newValue) => {
            handleRatingChange(newValue);
          }}
        />
        <TextField
          id="feedback"
          label="Feedback"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={feedback}
          onChange={handleFeedbackChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitFeedback}
        >
          Submit Feedback
        </Button>
        <br />
        <br />
        <Typography variant="h6" gutterBottom>
          Feedback:
        </Typography>
        {feedbackList.map((feedback, index) => (
          <div key={index}>
            <Typography variant="body1">User: {feedback.userName}</Typography>
            <Typography variant="body1">Rating: {feedback.rating}</Typography>
            <Typography variant="body1">Feedback: {feedback.feedback}</Typography>
          </div>
        ))}
      </CardContent>
    </StyledCard>
  );
};

export default ProductDetails;
