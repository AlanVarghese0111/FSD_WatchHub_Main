  import React from 'react';
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  import Container from '@mui/material/Container';
  import CssBaseline from '@mui/material/CssBaseline';
  import { createTheme, ThemeProvider } from '@mui/material/styles';
  import { CartProvider } from './components/CartContext';
  import Home from './components/Home';
  import Cart from './components/Cart';
  import About from './components/About';
  import Login from './components/Login';
  import Signup from './components/Signup';
  import AdminDashboard from './components/Admin/AdminDashboard';
  import AddProduct from './components/Admin/AddProduct';
  import ViewProducts from './components/Admin/ViewProducts';
  import ViewAllUsers from './components/Admin/ViewAllUsers';
  import UpdateProduct from './components/Admin/UpdateProduct';
  import Layout from './components/Layout';
  import Viewwatch from './components/Viewwatch';
  import Userdata from './components/Userdata';
  import Orders from './components/Orders';
  import BuyNow from './components/BuyNow';
  import ViewAllOrders from './components/Admin/ViewOrder';
  import OrderManagement from './components/Admin/OrderManagement';
  import ProductDetails from './components/ProductDetails';
  import EditAdmin from './components/Admin/EditAdmin';
import CartBuynow from './components/CartBuynow';

  const theme = createTheme({
    palette: {
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#000',
      },
    },
  });

  function App() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <CartProvider>
              <Container style={{ width: '100%', marginTop: '80px', padding: '0px' }}>
                <Routes>
                  <Route path="/" element={<Layout><Home /></Layout>} />
                  <Route path="/cart/:userId" element={<Layout><Cart /></Layout>} />
                  <Route path="/about" element={<Layout><About /></Layout>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/addproduct" element={<AddProduct />} />
                  <Route path="/viewproducts" element={<ViewProducts />} />
                  <Route path="/viewusers" element={<ViewAllUsers />} />
                  <Route path="/updateproduct/:productId" element={<UpdateProduct />} />
                  <Route path="/viewwatch/:category" element={<Layout><Viewwatch /></Layout>} />
                  <Route path="/buynow/:productId/:quantity" element={<Layout><BuyNow /></Layout>} />
        <Route path="/cartbuynow" element={<CartBuynow />} />
                  <Route path="/userdata" element={<Layout><Userdata /></Layout>} />
                  <Route path="/orders" element={<Layout><Orders /></Layout>} />
                  {/* <Route path="/vieworders" element={<ViewAllOrders />} /> */}
                  <Route path="/ordersmanagement" element={<OrderManagement />} />
                  <Route path="/productdetails/:productId" element={<Layout><ProductDetails /></Layout>} />
                  <Route path="/editadmin/:userId" element={<EditAdmin />} />
                  
                </Routes>
              </Container>
          </CartProvider>
        </Router>
      </ThemeProvider>
    );
  }

  export default App;
