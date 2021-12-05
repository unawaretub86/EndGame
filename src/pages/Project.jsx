import React from 'react';
import { Grid, Paper, styled, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import Button from '@mui/material/Button';
import { useQuery } from '@apollo/client';
// components
import { ContextModal } from '../contexts/ContextModal';
import ModalWindow from '../components/generic-containers/ModalWindow';
import MediaCard from '../components/generic-containers/MediaCard';
import InfoProject from '../components/projects/InfoProject';
import FormCreateProject from '../components/projects/FormCreateProject';
// utilities
import { GET_PROJECTS_ALL } from '../graphql/projects/prj-queries'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const imgarray =[
  'https://www.biospace.com/getasset/83298754-d463-4202-a940-9af7c0dca39e/',
  'https://www.wallpapertip.com/wmimgs/51-517415_go-back-gallery-for-cool-science-backgrounds-cool.jpg',
  'https://scienceoxford.com/wp-content/uploads/2016/08/potions2-e1470398708986-800x483.jpg',
  'https://www.ucl.ac.uk/medical-sciences/sites/medical_sciences/files/microscope_blue_gloves.jpeg',
  'https://blog.mmumullana.org/wp-content/uploads/2019/12/blog-image-for-Computer-Science.jpg',
  'https://www.nsf.gov/news/mmg/media/images/oceans_nsf-v2_9e8b03d8-14ae-4c47-8f12-385e4357ed3f_f.jpg',
  'https://sites.uw.edu/bevanseries/files/2018/03/154062807_science-communication_-iStockphoto_Thinkstock-1goqkz6-816x528.jpg',
  'https://www.biospace.com/getasset/83298754-d463-4202-a940-9af7c0dca39e/',
  'https://www.wallpapertip.com/wmimgs/51-517415_go-back-gallery-for-cool-science-backgrounds-cool.jpg',
  'https://scienceoxford.com/wp-content/uploads/2016/08/potions2-e1470398708986-800x483.jpg',
  'https://www.ucl.ac.uk/medical-sciences/sites/medical_sciences/files/microscope_blue_gloves.jpeg',
  'https://blog.mmumullana.org/wp-content/uploads/2019/12/blog-image-for-Computer-Science.jpg',
  'https://www.nsf.gov/news/mmg/media/images/oceans_nsf-v2_9e8b03d8-14ae-4c47-8f12-385e4357ed3f_f.jpg',
  'https://sites.uw.edu/bevanseries/files/2018/03/154062807_science-communication_-iStockphoto_Thinkstock-1goqkz6-816x528.jpg'
];

function Project() {
  
  const [stModal, setStModal] = React.useState({title: '', content: Function, open: false});
  
  const { data, error, loading } = useQuery(GET_PROJECTS_ALL);

  // const hdlCreateProject = () => {
  //   setStOpenModal(true);
  //   setStModalTitle('Create Project');
  //   setStModalContent(<FormCreateProject />);
  // }
  
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Error :x</p>;
  }

  const dataAllProjects = data.allProjects.map((project,index) => ({...project, urlimg: imgarray[index]})); 
  
  console.log('Fetchs projects and renders projects page',dataAllProjects);
  console.log('stModal',stModal);
  
  return (
    <>
      <pre>
        {JSON.stringify(dataAllProjects, null, 2)}
      </pre>
      <ContextModal.Provider value={{stModal, setStModal}}>
        <ModalWindow titleModal={stModal.title} contentModal={stModal.content} openModal={stModal.open}/>
        <Button
            size="small"
            type="button"
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => setStModal({title: 'Create Project', content: <FormCreateProject />, open: true})}
            >
          <Icon icon="bi:plus-circle" width={24} height={24}/>
          <Typography>
            Add Project
          </Typography>
        </Button>
        <Grid container spacing={2}>
          {dataAllProjects.map(project => (
            <Grid key={project._id} item xs={4}>
              <Item >
                <MediaCard
                  dataID={project._id}
                  title={project.name}
                  description={project.generalObjective}
                  image={project.urlimg}
                  alt={project.name}
                  />
              </Item>
            </Grid>
          ))}
        </Grid>
      </ContextModal.Provider>
    </>
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
