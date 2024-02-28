import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid, Card, CardContent, CardMedia, Button, Snackbar } from '@mui/material';
import img1 from './assets/Rolex.jpg';
import img2 from './assets/casio.jpeg';
import img3 from './assets/fossil.jpg';
import img4 from './assets/tag_heuer.jpg';
import img5 from './assets/Breitling.jpg'
import img6 from './assets/Vacheron_Constantin.jpg'
import img7 from './assets/Patek_Philippe.jpg'
import img8 from './assets/Hublot .jpg'
import classic_watch from './assets/classic_watch.jpg';
import Sports_watch from './assets/sports_watch.jpg';
import Smart_watch from './assets/smart_watch.jpg';
import bgImage from './assets/bg1.jpg';

const Home = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = bgImage;
    img.onload = () => {
      setBgLoaded(true);
    };
  }, []);

  const popularBrands = [
    { id: 1, name: 'Rolex', image: img1, alt: 'Rolex' },
    { id: 2, name: 'Casio', image: img2, alt: 'Casio' },
    { id: 3, name: 'Fossil', image: img3, alt: 'Fossil' },
    { id: 4, name: 'Tag Heuer', image: img4, alt: 'Tag Heuer' },
    { id: 5, name: 'Breitling', image: img5, alt: 'Breitling' },
    { id: 6, name: 'Vacheron Constantin', image: img6, alt: 'Vacheron Constantin' },
    { id: 7, name: 'Patek Philippe', image: img7, alt: 'Patek Philippe' },
    { id: 8, name: 'Hublot', image: img8, alt: 'Hublot' }, 
  ];

  const watches = [
    { id: 1, name: 'Classic Watch', image: classic_watch, rating: 4, alt: 'classic-watch' },
    { id: 2, name: 'Sports Watch', image: Sports_watch, rating: 4.5, alt: 'sports-watch' },
    { id: 3, name: 'Smart Watch', image: Smart_watch, rating: 5, alt: 'smart-watch' },
  ];

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography variant="h1" style={{ fontSize: '36px', fontWeight: '400', color: '#333', letterSpacing: '2px', marginBottom: '20px', textShadow: '1px 1px 2px #999', padding: '10px' }}>
          <span style={{ background: '#000080', color: '#f9f9f9', padding: '2px', paddingLeft: '15px', paddingRight: '5px', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px' }}>Watch</span>
          <span style={{ background: '#f9f9f9', border: '2px solid #000', boxShadow: '1px 2px 4px #ccc', paddingLeft: '5px', paddingRight: '5px', borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}>Hub</span>
        </Typography>
        <Typography variant="h2" style={{height: '70vh', fontSize: '24px', fontWeight: 'bold', color: '#000', textShadow: '1px 2px 4px #ccc', marginBottom: '20px', letterSpacing: '1px', margin: '1%', backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px', paddingTop: '10px', boxShadow: '1px 2px 4px #aaa, -1px -2px 4px #aaa', textAlign: 'center', transition: 'opacity 1s ease-in-out', opacity: bgLoaded ? '1' : '0' }}>
          "Your Ultimate Destination for High-Quality Watches..."
        </Typography>
      </Grid>

      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography variant="h3" style={{ padding: '4%', letterSpacing: '2px', textShadow: '1px 2px 4px #aaa', textAlign: 'center' }}>
          Popular Brands
        </Typography>
      </Grid>
      
      {popularBrands.map((brand) => (
        <Grid item key={brand.id} xs={12} sm={6} md={3}>
          <Card style={{border: '2px solid #000', maxWidth: '300px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
            <CardMedia
              component="img"
              style={{ height: '200px', objectFit: 'contain', textAlign: 'center' }}
              image={brand.image}
              alt={brand.alt}
            />
            <CardContent style={{ padding: '20px', textAlign: 'center', textShadow: '1px 2px 4px #aaa', letterSpacing: '2px' }}>
              <Typography variant="subtitle1">{brand.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}

      <Grid item xs={12} style={{ textAlign: 'center', margin: '5%' }}>
        <Typography variant="h2" style={{ fontSize: '40px', letterSpacing: '2px', textShadow: '1px 2px 4px #bbb' }}>
          Featured Products
        </Typography>
      </Grid>

      {watches.map((watch) => (
        <Grid item key={watch.id} xs={12} sm={6} md={4} lg={3}>
          <Card style={{ maxWidth: '300px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
            <CardMedia
              component="img"
              style={{ height: '200px', objectFit: 'contain', textAlign: 'center' }}
              image={watch.image}
              alt={watch.alt}
            />
            <CardContent style={{ padding: '20px', textAlign: 'center', textShadow: '1px 2px 4px #aaa', letterSpacing: '2px' }}>
              <Link to={`/viewwatch/${watch.alt}`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" style={{ display: 'block', width: '100%', marginTop: '20px', backgroundColor: '#333', letterSpacing: '2px', color: '#fff', '&:hover': { backgroundColor: 'brown' } }}>
                  <Typography variant="h7">{watch.name}</Typography>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      ))}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message="Item added to cart"
      />
    </Grid>
  );
};

export default Home;
