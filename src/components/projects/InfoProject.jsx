import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { Typography, Card, Divider, Grid, CardContent, Box } from '@mui/material';
import { GET_PROJECT_BYID } from '../../graphql/projects/prj-queries';

InfoProject.propTypes = {
  dataID: PropTypes.object
};

export default function InfoProject({ dataID }) {
  console.log('Info Project ~ GET_PROJECT_ID ~ ', GET_PROJECT_BYID);
  console.log('Info Project ~ dataID ~ ', dataID);
  const resp = useQuery(GET_PROJECT_BYID, {
    variables: {
      id: dataID
    }
  });
  console.log('Info Project ~ resp ~ ', resp);
  const { data, error, loading } = resp;
  console.log(
    'Info Project ~ data ~ ',
    data,
    'Info Project ~ error ~ ',
    error,
    'Info Project ~ loadingQuery ~ ',
    loading
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const projectInfo = data.projectById;

  return (
    <Card>
      <Divider />
      <CardContent>
        <Grid container spacing={0} direction="column" alignItems="center" justify="center">
          {/* <Typography variant="h10" sx={{ color: '#229A16' }} noWrap>
            Project Name : &nbsp;
          </Typography> */}
          <Typography variant="h3" sx={{ color: '#229A16' }} justifyContent="stretch" Wrap>
            {projectInfo.name}
          </Typography>
        </Grid>
        <Grid item md={6} xs={2}>
          <Typography variant="h10" sx={{ color: '#229A16' }} noWrap>
            Leader: &nbsp;
          </Typography>
          <Typography variant="h12">
            {projectInfo.leader.name.concat(' ', projectInfo.leader.lastName)}
          </Typography>
        </Grid>
        <Grid container spacing={4} rowSpacing={1}>
          <Grid item md={6} xs={2}>
            <Typography variant="h10" sx={{ color: '#229A16' }} noWrap>
              Start date: &nbsp;
              <Typography variant="h12" noWrap>
                {projectInfo.startDate}
              </Typography>
            </Typography>
          </Grid>
          <Grid item md={6} xs={2}>
            <Typography variant="h10" sx={{ color: '#229A16' }} noWrap>
              End date: &nbsp;
              <Typography variant="h12" noWrap>
                {projectInfo.endDate}
              </Typography>
            </Typography>
          </Grid>
          <Grid item md={6} xs={2}>
            <Typography variant="h10" sx={{ color: '#229A16' }} noWrap>
              Budget: &nbsp;
            </Typography>
            <Typography variant="h12" noWrap>
              {projectInfo.budget}
            </Typography>
          </Grid>
          <Grid item md={6} xs={2}>
            <Typography variant="h10" sx={{ color: '#229A16' }} noWrap>
              Status: &nbsp;
            </Typography>
            <Typography variant="h12" noWrap>
              {projectInfo.status}
            </Typography>
          </Grid>
        </Grid>
        {/* <Grid item md={6} xs={6}>
          {' '}
          <Typography variant="h10" sx={{ color: '#229A16' }} noWrap>
            Project ID : &nbsp;
          </Typography>
          <Typography variant="h12" noWrap>
            {projectInfo._id.substr(-5, 5)}
          </Typography>
        </Grid> */}
        <Box paddingTop={4}>
          <Grid item md={6} xs={2}>
            <Typography variant="h10" sx={{ color: '#229A16' }}>
              General Objective : &nbsp;
            </Typography>
            <Typography variant="h12" noWrap>
              {projectInfo.generalObjective}
            </Typography>
          </Grid>
        </Box>

        <Grid container spacing={4} rowSpacing={2}>
          <Grid item md={12} xs={2}>
            <Typography variant="h10" sx={{ color: '#229A16' }} noWrap>
              Specific objectives : &nbsp;
            </Typography>
            {projectInfo.specificObjectives.map((elem, index) => (
              <li key={index}>
                <Typography variant="p" justifyContent="stretch">
                  {elem}
                </Typography>
              </li>
            ))}
          </Grid>

          {/* <Grid item md={6} xs={2}>
            <Typography variant="h10" sx={{ color: '#229A16' }} noWrap>
              Leader ID: &nbsp;
            </Typography>
            <Typography variant="h12" noWrap>
              {projectInfo.leader._id}
            </Typography>
          </Grid> */}
        </Grid>
      </CardContent>
      <Divider />
    </Card>
  );
}
