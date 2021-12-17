import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';

import { Button, Box, Typography } from '@mui/material';
import { ADD_ENROLLMENT } from '../../graphql/enrollments/enr-mutations';
import { GET_PROJECT_BYID } from '../../graphql/projects/prj-queries';
import { ContextUser } from '../../contexts/ContextUser';
import AlertAndres from '../generic-containers/AlertAndres';

EnrollProject.propTypes = {
  dataID: PropTypes.string
};

export default function EnrollProject({ dataID }) {
  const [mtEnroll] = useMutation(ADD_ENROLLMENT);
  const { userData } = React.useContext(ContextUser);
  const [stAlert, setStAlert] = React.useState({ open: false, isGood: true, txt: '' });

  const hdlClick = async () => {
    const toSend = { variables: { input : { project_id: dataID, user_id: userData._id } } };
    console.log('EnrollProject.jsx ~ toSend ~ ', toSend);
    const resp = await mtEnroll(toSend);
    console.log('EnrollProject.jsx ~ resp ~ ', resp);
    if (resp) {
      setStAlert({ open: true, isGood: true, txt: 'Advancement successfully registered' });
    } else setStAlert({ open: true, isGood: false, txt: 'Advancement NOT registered' });
  };

  const resp = useQuery(GET_PROJECT_BYID, {
    variables: {
      id: dataID
    }
  });
  const { data, error, loading } = resp;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const projectInfo = data.projectById;

  return (
    <>
      <AlertAndres sx={{ mb: 2 }} open={stAlert.open} isGood={stAlert.isGood} txt={stAlert.txt} />
      <Box sx={{ my: 2 }} textAlign="center">
        <Typography variant="h10" noWrap>
          {userData.name}! Please, confirm your enrollment into this project.
        </Typography>
      </Box>
      <Box>
        <Typography variant="h10" sx={{ color: 'text.secondary' }} noWrap>
          Project Name : &nbsp;
        </Typography>
        <Typography variant="h12" noWrap>
          {projectInfo.name}
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h10" sx={{ color: 'text.secondary' }} noWrap>
          Project leader : &nbsp;
        </Typography>
        <Typography variant="h12" noWrap>
          projectInfo.leader.name projectInfo.leader.lastName
        </Typography>
      </Box>
      <Box textAlign="center" spacing={3}>
        <Button onClick={hdlClick} variant="contained" color="primary">
          Enroll now
        </Button>
      </Box>
    </>
  );
}
