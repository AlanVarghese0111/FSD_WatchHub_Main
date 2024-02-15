import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import img1 from './assets/Rolex.jpg';
import img2 from './assets/casio.jpeg';
import img3 from './assets/fossil.jpg';
import img4 from './assets/tag_heuer.jpg';
import classic_watch from './assets/classic_watch.jpg';
import Sports_watch from './assets/sports_watch.jpg';
import Smart_watch from './assets/smart_watch.jpg';
import Slider from './Slider';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Snackbar,
  Grow
} from '@mui/material';

const Home = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const navigate = useNavigate();

  const popularBrands = [
    { id: 1, name: 'Rolex', image: img1, alt: 'Rolex' },
    { id: 2, name: 'Casio', image: img2, alt: 'Casio' },
    { id: 3, name: 'Fossil', image: img3, alt: 'Fossil' },
    { id: 4, name: 'Tag Heuer', image: img4, alt: 'Tag Heuer' },
  ];

  const watches = [
    { id: 1, name: 'Classic Watch', image: classic_watch, rating: 4, alt: 'classic-watch' },
    { id: 2, name: 'Sports Watch', image: Sports_watch, rating: 4.5, alt: 'sports-watch' },
    { id: 3, name: 'Smart Watch', image: Smart_watch, rating: 5, alt: 'smart-watch' },
  ];

  // const handleViewProduct = (productId, productName, alt) => {
  //   switch (productId) {
  //     case 1:
  //       navigate(`/classic-watch/${productName.replace(/\s+/g, '-').toLowerCase()}/${alt}`);
  //       break;
  //     case 2:
  //       navigate(`/sports-watch/${productName.replace(/\s+/g, '-').toLowerCase()}/${alt}`);
  //       break;
  //     case 3:
  //       navigate(`/smart-watch/${productName.replace(/\s+/g, '-').toLowerCase()}/${alt}`);
  //       break;
  //     default:
  //       // Handle other cases or provide a default route
  //       break;
  //   }
  // };
  

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        padding: '0px',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to <span style={{ color: 'brown' }}>Watch</span> Hub
      </Typography>
      <Slider />

      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Popular Brands
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {popularBrands.map((brand) => (
          <Grid item key={brand.id} xs={6} sm={4} md={3}>
            <Card style={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="fit-content"
                style={{ objectFit: 'cover', background: 'none' }}
                image={brand.image}
                alt={brand.alt}
              />
              <CardContent>
                <Typography variant="subtitle1">{brand.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom style={{ marginTop: '40px' }}>
        Featured Products
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {watches.map((watch) => (
          <Grid item key={watch.id} xs={12} sm={6} md={4}>
            <Grow in={true} timeout={500}>
              <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="500px"
                  style={{ objectFit: 'cover', background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',textAlign:"center" }}
                  image={watch.image}
                  alt={watch.alt}
                />
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography variant="h5">{watch.name}</Typography>
                  
                </CardContent>
                <Link to={`/viewwatch/${watch.alt}`}>
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{
                      borderRadius: '0',
                      borderTop: '1px solid #ddd',
                      backgroundColor: '#333',
                      transition: 'background-color 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'brown',
                      },
                    }}
                    //onClick={() => handleViewProduct(watch.id, watch.name)} // No longer need this
                  >
                    View Products
                  </Button>
                </Link>
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message="Item added to cart"
      />
    </div>
  );
};

export default Home;
