import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NestedModal from '../modal/ChildModal';
import { FormModal } from '../modal/FomModal';


function AbrirModal  ()  {
  return (
  <>
    <NestedModal/>
  </>
  
  )
};

export default function MediaCard({ titulo, explicacion, imagen, alt }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={imagen} alt={alt} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {explicacion}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
        
        size="small"><FormModal/></Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
