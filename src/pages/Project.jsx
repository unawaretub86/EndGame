import { Grid, Paper, styled } from '@mui/material';
import React from 'react';
import MediaCard from '../components/card/MediaCard';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

function Project() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Item>
          <MediaCard
            titulo="water studies"
            explicacion="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis expedita laborum laudantium culpa, ea pariatur vero tempora iusto minus qui dolore, commodi illum consequuntur voluptate eveniet quibusdam quia assumenda odit?"
            imagen="https://www.topdoctors.mx/files/Image/large/10cbfd60bb6b744fccbf6ebc21837b80.png"
            alt="H2O"
          />
        </Item>
      </Grid>
      <Grid item xs={4}>
        <Item>
          <MediaCard
            titulo="water studies"
            explicacion="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis expedita laborum laudantium culpa, ea pariatur vero tempora iusto minus qui dolore, commodi illum consequuntur voluptate eveniet quibusdam quia assumenda odit?"
            imagen="https://www.topdoctors.mx/files/Image/large/10cbfd60bb6b744fccbf6ebc21837b80.png"
            alt="H2O"
          />
        </Item>
      </Grid>
      <Grid item xs={4}>
        <Item>
          <MediaCard
            titulo="water studies"
            explicacion="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis expedita laborum laudantium culpa, ea pariatur vero tempora iusto minus qui dolore, commodi illum consequuntur voluptate eveniet quibusdam quia assumenda odit?"
            imagen="https://www.topdoctors.mx/files/Image/large/10cbfd60bb6b744fccbf6ebc21837b80.png"
            alt="H2O"
          />
        </Item>
      </Grid>
      <Grid item xs={4}>
        <Item>
          <MediaCard
            titulo="water studies"
            explicacion="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis expedita laborum laudantium culpa, ea pariatur vero tempora iusto minus qui dolore, commodi illum consequuntur voluptate eveniet quibusdam quia assumenda odit?"
            imagen="https://www.topdoctors.mx/files/Image/large/10cbfd60bb6b744fccbf6ebc21837b80.png"
            alt="H2O"
          />
        </Item>
      </Grid>
      <Grid item xs={4}>
        <Item>
          <MediaCard
            titulo="water studies"
            explicacion="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis expedita laborum laudantium culpa, ea pariatur vero tempora iusto minus qui dolore, commodi illum consequuntur voluptate eveniet quibusdam quia assumenda odit?"
            imagen="https://www.topdoctors.mx/files/Image/large/10cbfd60bb6b744fccbf6ebc21837b80.png"
            alt="H2O"
          />
        </Item>
      </Grid>
      <Grid item xs={4}>
        <Item>
          <MediaCard
            titulo="water studies"
            explicacion="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis expedita laborum laudantium culpa, ea pariatur vero tempora iusto minus qui dolore, commodi illum consequuntur voluptate eveniet quibusdam quia assumenda odit?"
            imagen="https://www.topdoctors.mx/files/Image/large/10cbfd60bb6b744fccbf6ebc21837b80.png"
            alt="H2O"
          />
        </Item>
      </Grid>
      <Grid item xs={4}>
        <Item>
          <MediaCard
            titulo="water studies"
            explicacion="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis expedita laborum laudantium culpa, ea pariatur vero tempora iusto minus qui dolore, commodi illum consequuntur voluptate eveniet quibusdam quia assumenda odit?"
            imagen="https://www.topdoctors.mx/files/Image/large/10cbfd60bb6b744fccbf6ebc21837b80.png"
            alt="H2O"
          />
        </Item>
      </Grid>
    </Grid>
  );
}

export default Project;

// import { useFormik } from 'formik';
// import { useState } from 'react';
// // material
// import { Container, Stack, Typography } from '@mui/material';
// // components
// import Page from '../components/Page';
// import {
//   ProductSort,
//   ProductList,
//   ProductCartWidget,
//   ProductFilterSidebar
// } from '../components/_dashboard/products';
// //
// import PRODUCTS from '../_mocks_/products';

// // ----------------------------------------------------------------------

// export default function EcommerceShop() {
//   const [openFilter, setOpenFilter] = useState(false);

//   const formik = useFormik({
//     initialValues: {
//       gender: '',
//       category: '',
//       colors: '',
//       priceRange: '',
//       rating: ''
//     },
//     onSubmit: () => {
//       setOpenFilter(false);
//     }
//   });

//   const { resetForm, handleSubmit } = formik;

//   const handleOpenFilter = () => {
//     setOpenFilter(true);
//   };

//   const handleCloseFilter = () => {
//     setOpenFilter(false);
//   };

//   const handleResetFilter = () => {
//     handleSubmit();
//     resetForm();
//   };

//   return (
//     <Page title="Dashboard: Products | Minimal-UI">
//       <Container>
//         <Typography variant="h4" sx={{ mb: 5 }}>
//           Products
//         </Typography>

//         <Stack
//           direction="row"
//           flexWrap="wrap-reverse"
//           alignItems="center"
//           justifyContent="flex-end"
//           sx={{ mb: 5 }}
//         >
//           <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
//             <ProductFilterSidebar
//               formik={formik}
//               isOpenFilter={openFilter}
//               onResetFilter={handleResetFilter}
//               onOpenFilter={handleOpenFilter}
//               onCloseFilter={handleCloseFilter}
//             />
//             <ProductSort />
//           </Stack>
//         </Stack>

//         <ProductList products={PRODUCTS} />
//         <ProductCartWidget />
//       </Container>
//     </Page>
//   );
// }
