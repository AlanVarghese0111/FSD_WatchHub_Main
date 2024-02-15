// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Typography, Card, CardContent, CardMedia, Grid, Divider, Box } from '@mui/material';
// import StarIcon from '@mui/icons-material/Star';

// const ViewProduct = () => {
//   const { productId } = useParams();
//   const [productDetails, setProductDetails] = useState(null);

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/product/viewproduct/${productId}`);
//         setProductDetails(response.data);
//       } catch (error) {
//         console.error('Error fetching product details:', error);
//       }
//     };

//     fetchProductDetails();
//   }, [productId]);

//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12} md={6}>
//         <Card>
//           <div style={{ position: 'relative', width: '100%', height: '300px' }}>
//             <CardMedia
//               component="img"
//               alt={productDetails?.name || ''}
//               style={{ objectFit: 'contain', width: '100%', height: '100%' }}
//               image={productDetails?.image || ''}
//             />
//           </div>
//         </Card>
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <Card>
//           <CardContent>
//             <Typography variant="h4" gutterBottom>
//               {productDetails?.name || ''}
//             </Typography>
//             <Typography variant="h6" color="textSecondary">
//               Price: ₹{productDetails?.price || ''}
//             </Typography>
//             <Typography variant="body1" paragraph>
//               {productDetails?.description || ''}
//             </Typography>
//             <Typography variant="subtitle1" color="textSecondary">
//               Stock Available: {productDetails?.stock || ''} units
//             </Typography>
//             <Divider style={{ margin: '20px 0' }} />
//             <Typography variant="subtitle1" color="textSecondary">
//               Rating:
//             </Typography>
//             <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
//               <StarIcon sx={{ color: '#fdd835' }} />
//               <Typography variant="subtitle1" color="textSecondary" sx={{ marginLeft: '5px' }}>
//                 {productDetails?.rating || ''} ({productDetails?.reviews || ''} reviews)
//               </Typography>
//             </Box>
//             {/* Add more details as needed */}
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// };

// export default ViewProduct;
