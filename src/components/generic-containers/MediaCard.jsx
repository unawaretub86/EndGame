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
import AdminProject from '../projects/AdminProject';
import EnrollProject from '../projects/EnrollProject';

// context
import { ContextUser } from '../../contexts/ContextUser';
import FormDoAdvnc from '../projects/FormDoAdvnc';


export default function MediaCard({ dataID, title, description, image, alt }) {
  console.log('Renders MediaCard');
  const { setStModal } = React.useContext(ContextModal);
  const { userData } = React.useContext(ContextUser);

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
        {userData.role === 'leader' ?
          <Button 
            onClick={()=>setStModal({
              content: <FormUpdateProject dataID={dataID} />,
              title: "Update",
              open: true
            })}
            size="small">
            Update
          </Button>
          :null}
        {userData.role === 'admin' ? 
        <>
          <Button 
            onClick={()=>setStModal({
              content: <AdminProject dataID={dataID} />,
              title: "Administrate",
              open: true
            })}
            size="small">
            Admin
          </Button>
          <Button
          onClick={()=>setStModal({
            content: <FormDoAdvnc dataID={dataID} prjTitle={title}/>,
            title: "Advancement",
            open: true
          })}
          size="small">
          Advance
        </Button>
        </>
          : null}
        {userData.role === 'student' ?
        <>
          <Button
            onClick={()=>setStModal({
              content: <EnrollProject dataID={dataID}/>,
              title: "Enroll",
              open: true
            })}
            size="small">
            Enroll
          </Button>
          <Button
            onClick={()=>setStModal({
              content: <FormDoAdvnc dataID={dataID} prjTitle={title}/>,
              title: "Advancement",
              open: true
            })}
            size="small">
            Advance
          </Button>
        </>
          : null}
      </CardActions>
    </Card>
  );
}