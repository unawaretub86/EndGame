import * as React from 'react';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

// our components
import { ContextModal } from '../../contexts/ContextModal';
import InfoProject from '../projects/InfoProject';
import FormUpdateProject from '../projects/FormUpdateProject';
import AdminProject from '../projects/AdminProject';
import EnrollProject from '../projects/EnrollProject';

// context
import { ContextUser } from '../../contexts/ContextUser';
import FormDoAdvnc from '../projects/FormDoAdvnc';

MediaCard.propTypes = {
  prjData: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  alt: PropTypes.string
};

export default function MediaCard({ prjData, title, description, image, alt }) {
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
          onClick={() =>
            setStModal({
              content: <InfoProject dataID={prjData.ID} />,
              title: 'Learn More',
              open: true
            })
          }
          size="small"
        >
          Learn More
        </Button>
        {/* buttons of LEADER */}
        {userData.role === 'leader' ? (
          <Button
            onClick={() =>
              setStModal({
                content: <FormUpdateProject dataID={prjData.ID} />,
                title: 'Update',
                open: true
              })
            }
            size="small"
          >
            Update
          </Button>
        ) : null}
        {/* buttons of ADMIN */}
        {userData.role === 'admin' ? (
          <>
            <Button
              onClick={() =>
                setStModal({
                  content: <AdminProject dataID={prjData.ID} />,
                  title: 'Administrate',
                  open: true
                })
              }
              size="small"
            >
              Admin
            </Button>
          </>
        ) : null}
        {/* buttons of STUDENT */}
        {userData.role === 'student' ? 
          <>
            {prjData.isStudentProjects ? 
              <Button
              onClick={() =>
                setStModal({
                  content: <FormDoAdvnc dataID={prjData.ID} prjTitle={title} />,
                  title: 'Advancement',
                  open: true
                })
              }
              size="small"
              >
                Advance
              </Button>
            : <Button
                onClick={() =>
                  setStModal({
                    content: <EnrollProject dataID={prjData.ID} />,
                    title: 'Enroll',
                    open: true
                  })
                }
                size="small"
              >
                Enroll
              </Button>
            }
          </>
        : null}
      </CardActions>
    </Card>
  );
}
