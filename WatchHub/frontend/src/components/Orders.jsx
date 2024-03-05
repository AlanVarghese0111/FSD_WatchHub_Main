import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  styled,
  Button,
  CircularProgress,
} from "@mui/material";

const StyledCard = styled(Card)({
  marginBottom: (theme) => theme.spacing(4),
  backgroundColor: "#f9f9f9",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.03)",
  },
});

const useStyles = {
  root: {
    padding: (theme) => theme.spacing(3),
  },
  title: {
    marginBottom: (theme) => theme.spacing(4),
    fontWeight: "bold",
    color: "#333333",
  },
  button: {
    marginTop: (theme) => theme.spacing(2),
    marginRight: (theme) => theme.spacing(2),
    color: "#ffffff", // Text color of buttons
    borderRadius: "20px", // Rounded corners
    padding: "10px 20px", // Increased padding
    fontWeight: "bold", // Bold text
    fontSize: "16px", // Increased font size
    transition: "background-color 0.3s", // Smooth transition on hover
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  status: {
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: (theme) => theme.spacing(1),
    padding: (theme) => theme.spacing(1),
    borderRadius: "4px",
    fontSize: "14px", // Increased font size
    marginBottom: "10px", // Added margin bottom
  },
  confirmedStatus: {
    backgroundColor: "#4caf50",
    color: "#ffffff",
  },
  cancelledStatus: {
    backgroundColor: "#f44336",
    color: "#ffffff",
  },
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [confirmOrderId, setConfirmOrderId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserOrders = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `http://localhost:5000/api/order/userorders/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user orders");
      }
      const data = await response.json();

      const ordersWithProducts = await Promise.all(
        data.map(async (order) => {
          const productResponse = await fetch(
            `http://localhost:5000/api/product/vieweachproduct/${order.productId}`
          );
          const productData = await productResponse.json();
          return { ...order, product: productData };
        })
      );

      setOrders(ordersWithProducts);
    } catch (error) {
      console.error("Error fetching user orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = (orderId) => {
    setConfirmOrderId(orderId);
  };

  const handleConfirmCancelOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/order/cancelorder/${orderId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to cancel order");
      }
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: "cancelled" } : order
        )
      );
      alert("Order canceled successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error canceling order:", error);
    } finally {
      setConfirmOrderId(null);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <div style={useStyles.root}>
      <Typography variant="h3" className={useStyles.title} gutterBottom>
        Orders
      </Typography>
      {loading ? (
        <div style={useStyles.loader}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5">Order ID: {order._id}</Typography>
                  <img
                    src={order.product.image}
                    alt={`Order ${order._id}`}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  <Typography variant="body1">
                    Product Name: {order.product.name}
                  </Typography>
                  <Typography variant="body1">
                    Description: {order.product.description}
                  </Typography>
                  <Typography variant="body1">
                    Price: {order.product.price}
                  </Typography>
                  <Typography variant="body1">
                    Category: {order.product.category}
                  </Typography>
                  <Typography variant="body2">
                    Quantity: {order.quantity}
                  </Typography>
                  <Typography
                    variant="h4"
                    className={
                      order.status === "confirmed"
                        ? `${useStyles.status} ${useStyles.confirmedStatus}`
                        : `${useStyles.status} ${useStyles.cancelledStatus}`
                    }
                  >
                    Status: {order.status}
                  </Typography>
                  {confirmOrderId === order._id && (
                    <>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={useStyles.button}
                        onClick={() => handleConfirmCancelOrder(order._id)}
                      >
                        Confirm Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        style={useStyles.button}
                        onClick={() => setConfirmOrderId(null)}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  {confirmOrderId !== order._id && (
                    <Button
                      variant="contained"
                      color="secondary"
                      style={useStyles.button}
                      onClick={() => handleCancelOrder(order._id)}
                    >
                      Cancel Order
                    </Button>
                  )}
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Orders;
