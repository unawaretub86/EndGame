// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import NestedModal from '../modal/ChildModal';
// import { FormModal } from '../modal/FomModal';
// import Form from '../Form/Form';
// import InfoProject from '../projects/InfoProject';
// import FormUpdateProject from '../projects/FormUpdateProject';

// function AbrirModal() {
//   return (
//     <>
//       <NestedModal />
//     </>
//   );
// }

// export default function MediaCard({ titulo, explicacion, imagen, alt }) {
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardMedia component="img" height="140" image={imagen} alt={alt} />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {titulo}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {explicacion}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <FormModal dataModal={{content: <InfoProject />, name: "Learn More"}} />
//         <FormModal dataModal={{content: <Form />, name: "Enroll"}} />
//         <FormModal dataModal={{content: <FormUpdateProject />, name: "Update"}} />
//         {/*
//         // :::::NOTA::::: >>> Podria que sea mejor sacar el botón del modal y ponerlo en el card
//         <Button size="small">
//         </Button>
//         <Button size="small">
//         </Button>
//         */}
//       </CardActions>
//     </Card>
//   );
// }
