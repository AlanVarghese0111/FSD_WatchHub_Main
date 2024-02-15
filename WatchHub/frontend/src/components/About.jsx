// src/components/About.jsx
import React from 'react';
import { Typography, Paper, Grid,} from '@mui/material';
import WatchIcon from '@mui/icons-material/Watch';

const About = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        <span style={{ color: 'brown' }}>Watch</span>Hub
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '20px auto' }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <WatchIcon style={{ fontSize: '4rem', color: 'brown' }} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="body1" paragraph>
                  Elevate your style with timepieces that transcend mere functionality – welcome to Watch Hub!
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" paragraph>
                  Discover a curated collection of watches that blend the art of craftsmanship with the science of
                  precision.
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" paragraph>
                  From classic elegance to cutting-edge technology, we've got the perfect watch for every wrist.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="body1" paragraph>
        <strong>Time is an experience.</strong> Explore our collection and make every moment count.
      </Typography>
    </div>
  );
};

export default About;
