import { Grid, Paper, styled } from '@mui/material';

import React from 'react';
import CardTimeLineTwo from '../components/card/CardTimeLineTwo';
import CardTimeLineThree from '../components/card/CardTimeLineThree';
import CardTimeLine from '../components/card/CardTimeLine';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));

function Advance () {
    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Item>
                        <CardTimeLine
                            title="water studies"
                            fase1="Inscripciones"
                        />
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>
                        <CardTimeLineTwo 
                            title="causes of femicide"
                            fase1="Inscriciones"
                            fase2="Inicio"
                        />
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>
                        <CardTimeLineTwo 
                            title="superconductors"
                            fase1="Inscriciones"
                            fase2="Inicio"
                        />
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>
                        <CardTimeLineThree
                            title="factors assimilated to violence"
                            fase1="Inscriciones"
                            fase2="Inicio"
                            fase3="Visitas"
                        />
                    </Item>
                </Grid>


            </Grid>
        </>
    )
}

export default Advance;

// import { motion } from 'framer-motion';
// import { Link as RouterLink } from 'react-router-dom';
// // material
// import { styled } from '@mui/material/styles';
// import { Box, Button, Typography, Container } from '@mui/material';
// // components
// import { MotionContainer, varBounceIn } from '../components/animate';
// import Page from '../components/Page';

// // ----------------------------------------------------------------------

// const RootStyle = styled(Page)(({ theme }) => ({
//   display: 'flex',
//   minHeight: '100%',
//   alignItems: 'center',
//   paddingTop: theme.spacing(15),
//   paddingBottom: theme.spacing(10)
// }));

// // ----------------------------------------------------------------------

// export default function Page404() {
//   return (
//     <RootStyle title="404 Page Not Found | Minimal-UI">
//       <Container>
//         <MotionContainer initial="initial" open>
//           <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
//             <motion.div variants={varBounceIn}>
//               <Typography variant="h3" paragraph>
//                 Sorry, page not found!
//               </Typography>
//             </motion.div>
//             <Typography sx={{ color: 'text.secondary' }}>
//               Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL?
//               Be sure to check your spelling.
//             </Typography>

//             <motion.div variants={varBounceIn}>
//               <Box
//                 component="img"
//                 src="/static/illustrations/illustration_404.svg"
//                 sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
//               />
//             </motion.div>

//             <Button to="/" size="large" variant="contained" component={RouterLink}>
//               Go to Home
//             </Button>
//           </Box>
//         </MotionContainer>
//       </Container>
//     </RootStyle>
//   );
// }
