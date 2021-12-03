import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// our components
import ModalWindow from './ModalWindow';
import Form from '../Form/Form';
import InfoProject from '../projects/InfoProject';
import FormUpdateProject from '../projects/FormUpdateProject';


export default function MediaCard({ payload, title, description, image, alt }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={image} alt={alt} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <ModalWindow dataModal={{content: <InfoProject />, name: "Learn More"}} />
        <ModalWindow dataModal={{content: <Form />, name: "Enroll"}} />
        <ModalWindow dataModal={{content: <FormUpdateProject />, name: "Update"}} />
        {/*
        // :::::NOTA::::: >>> Podria que sea mejor sacar el botón del modal y ponerlo en el card
        <Button size="small">
        </Button>
        <Button size="small">
        </Button>
        */}
      </CardActions>
    </Card>
  );
}
