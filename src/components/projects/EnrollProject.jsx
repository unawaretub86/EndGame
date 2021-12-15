import React from 'react'
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';

import { Button, Box, Typography, Grid } from '@mui/material';
import { GET_PROJECT_BYID } from '../../graphql/projects/prj-queries';
import { ContextModal } from '../../contexts/ContextModal';

EnrollProject.propTypes = {
    dataID: PropTypes.object
  };


export default function EnrollProject( { dataID } ) {

    const { stModal, setStModal } = React.useContext(ContextModal);
    const hdlClick = () => {
        // mandar la mutation
        setStModal({...stModal, open: false})
    }        

    const resp = useQuery(GET_PROJECT_BYID, {
        variables: {
          id: dataID
        }
      });
    const { data, error, loading } = resp
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
      
    const projectInfo = data.projectById;
    
    return (
        <>
        <Box sx={{my: 2}} textAlign='center'>
            <Typography variant="h10" noWrap>
                Please confirm your enrollment in this project.
            </Typography>
        </Box>
        <Box>
            <Typography variant="h10" sx={{ color: 'text.secondary' }} noWrap>
                Project Name : &nbsp;
            </Typography>
            <Typography variant="h12"  noWrap>
                {projectInfo.name}
            </Typography>
        </Box>
        <Box sx={{mb: 2}}>
            <Typography variant="h10" sx={{ color: 'text.secondary' }} noWrap>
                Project leader : &nbsp;
            </Typography>
            <Typography variant="h12"  noWrap>
                {projectInfo.leader.name} {projectInfo.leader.lastName}
            </Typography>
        </Box>
        <Box textAlign='center' spacing={3}>
            <Grid spacing={3} sx={{ justifyContent: 'center' }}>
                <Button onClick={hdlClick} variant="contained" color="primary">
                    Enroll now
                </Button>
            </Grid>
        </Box>
        </>
    )
}
