import * as React from 'react';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// our components
import { ContextModal } from '../../contexts/ContextModal';
import ModalWindow from './ModalWindow';
import Form from '../Form/Form';
import InfoProject from '../projects/InfoProject';
import FormUpdateProject from '../projects/FormUpdateProject';
import ActivateProject from '../projects/ActivateProject';
import EnrollProject from '../projects/EnrollProject';


export default function MediaCard({ dataID, title, description, image, alt }) {
  console.log('Renders MediaCard');
  const { setStModal } = React.useContext(ContextModal);

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
        {/*
        // afrp- forma segunda de trabajar modales
        <ModalWindow dataModal={{content: <InfoProject firstProjectData={payload} />, name: "Learn More"}} />
        <ModalWindow dataModal={{content: <Form />, name: "Enroll"}} />
        <ModalWindow dataModal={{content: <FormUpdateProject />, name: "Update"}} />
        */}
        <Button
          // afrp- con este setStModal se define el modal que seva a mostrar desde cualquier parte
          onClick={()=>setStModal({
            content: <InfoProject dataID={dataID} />,
            title: "Learn More",
            open: true
          })}
          size="small">
          Learn More
        </Button>
        <Button 
          onClick={()=>setStModal({
            content: <FormUpdateProject dataID={dataID} />,
            title: "Update",
            open: true
          })}
          size="small">
          Update
        </Button>
        <Button 
          onClick={()=>setStModal({
            content: <EnrollProject dataID={dataID} />,
            title: "Update",
            open: true
          })}
          size="small">
          Activate
        </Button>
        <Button
          onClick={()=>setStModal({
            content: <ActivateProject dataID={dataID} />,
            title: "Update",
            open: true
          })}
          size="small">
          Enroll
        </Button>
      </CardActions>
    </Card>
  );
}
