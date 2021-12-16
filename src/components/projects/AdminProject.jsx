import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Button, Typography } from '@mui/material';

import { GET_PROJECT_ADMIN_BYID } from '../../graphql/projects/prj-queries';
import { UPDATE_PROJECT } from '../../graphql/projects/prj-mutations';

export default function AdminProject({ dataID }) {
  const [stAdminProject, setStAdminProject] = React.useState({});
  const [mtUpdateProject] = useMutation(UPDATE_PROJECT);

  const { data, loading, error } = useQuery(GET_PROJECT_ADMIN_BYID, {
    variables: {
      id: dataID
    }
  });

  useEffect(() => {
    if (data) {
      setStAdminProject(data.projectById);
    }
  }, [data]);

  const hdlActivation = () => {
    const nextStatus = stAdminProject.status === 'inactive' ? 'active' : 'inactive';
    const toSend = { input: { projectById: dataID, status: nextStatus } };
    if (stAdminProject.phase === null && nextStatus === 'active') {
      toSend.input = { ...toSend.input, phase: 'started' };
      // mtUpdateProject({ variables: toSend });
      setStAdminProject({ ...stAdminProject, status: nextStatus, phase: 'started' });
      return;
    }
    // mtUpdateProject({ variables: toSend });
    setStAdminProject({ ...stAdminProject, status: nextStatus });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>xx Error xx</p>;

  return (
    <>
      {stAdminProject.status ? (
        <>
          <Typography> Project Name: {stAdminProject.name}</Typography>
          <Typography>
            {' '}
            Project Leader: {stAdminProject.leader.name.concat(' ', stAdminProject.leader.lastName)}
          </Typography>
          <Typography> Project Status: {stAdminProject.status}</Typography>
          <Typography> Project Phase: {stAdminProject.phase}</Typography>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <Button variant="outlined" onClick={hdlActivation}>
            {stAdminProject.status === 'inactive' ? 'Activate' : 'Inactivate'}
          </Button>
        </>
      ) : (
        <p>Loading......</p>
      )}
    </>
  );
}
