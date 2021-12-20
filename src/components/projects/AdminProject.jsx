import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Button, Typography, Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';

import { GET_PROJECT_BYID_TOADMIN } from '../../graphql/projects/prj-queries';
import {
  ACTIVATE_PROJECT,
  INACTIVATE_PROJECT,
  UPD_PHASE_PROJECT
} from '../../graphql/projects/prj-mutations';

AdminProject.propTypes = {
  dataID: PropTypes.object.isRequired
};

export default function AdminProject({ dataID }) {
  const [stAdminPrj, setStAdminPrj] = React.useState({});
  const [mtActivatePrj] = useMutation(ACTIVATE_PROJECT);
  const [mtInactivatePrj] = useMutation(INACTIVATE_PROJECT);
  const [mtTerminatePrj] = useMutation(UPD_PHASE_PROJECT);

  const { data, loading, error } = useQuery(GET_PROJECT_BYID_TOADMIN, {
    variables: {
      id: dataID
    }
  });

  useEffect(() => {
    if (data) {
      setStAdminPrj(data.projectById);
    }
  }, [data]);

  const hdlClickActivation = async () => {
    if (stAdminPrj.status === 'active') {
      const toSend = { input: { _id: dataID, status: 'inactive' } };
      console.log('AdminProject.jsx: hdlClickActivation: toSend: ', toSend);
      const resp = await mtInactivatePrj({
        variables: toSend
      });
      console.log('AdminProject.jsx: hdlClickActivation: resp: ', resp);
      setStAdminPrj({
        ...stAdminPrj,
        status: resp.data.inactivateProject.status,
        phase: resp.data.inactivateProject.phase
      });
    } else {
      const toSend = { input: { _id: dataID, status: 'active' } };
      console.log('AdminProject.jsx: hdlClickActivation: toSend: ', toSend);
      const resp = await mtActivatePrj({
        variables: toSend
      });
      console.log('AdminProject.jsx: hdlClickActivation: resp: ', resp);
      setStAdminPrj({
        ...stAdminPrj,
        status: resp.data.activateProject.status,
        phase: resp.data.activateProject.phase
      });
    }
  };

  const hdlClickTerminate = async () => {
    const toSend = { input: { _id: dataID } };
    console.log('AdminProject.jsx: hdlClickTerminate: toSend: ', toSend);
    const resp = await mtTerminatePrj({ variables: toSend });
    console.log('AdminProject.jsx: hdlClickTerminate: resp: ', resp);
    setStAdminPrj({
      ...stAdminPrj,
      status: resp.data.changePhaseProject.status,
      phase: resp.data.changePhaseProject.phase
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>xx Error xx</p>;

  return (
    <>
      {stAdminPrj._id ? (
        <>
          <Grid container spacing={0} direction="column" alignItems="center" justify="center">
            <Typography variant="h3" sx={{ color: '#229A16' }} noWrap>
              {stAdminPrj.name}
            </Typography>
          </Grid>

          <Typography>
            Project Leader:{' '}
            <strong> {stAdminPrj.leader.name.concat(' ', stAdminPrj.leader.lastName)}</strong>
          </Typography>
          <Typography>
            Project Status: <strong>{stAdminPrj.status}</strong>
          </Typography>
          <Typography>
            {' '}
            Project Phase: <strong>{stAdminPrj.phase}</strong>{' '}
          </Typography>

          <Box textAlign="center" paddingTop={2}>
            <Button
              sx={{ mx: 2 }}
              color="warning"
              variant="outlined"
              onClick={hdlClickActivation}
              disabled={stAdminPrj.phase === 'ended'}
            >
              {stAdminPrj.status === 'inactive' ? 'Activate' : 'Inactivate'}
            </Button>
            {stAdminPrj.phase === ('inProgress' || 'ended') ? (
              <Button
                sx={{ mx: 2 }}
                color="error"
                variant="outlined"
                onClick={hdlClickTerminate}
                disabled={stAdminPrj.phase === 'ended'}
              >
                {stAdminPrj.phase === 'inProgress' ? 'Terminate' : 'Terminated'}
              </Button>
            ) : null}
          </Box>
        </>
      ) : (
        <p>Loading......</p>
      )}
    </>
  );
}
