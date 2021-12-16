import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { Typography, Card, Divider, Grid, CardContent } from '@mui/material';
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
        <Grid item md={6} xs={6}>
          <Typography variant="h10" sx={{ color: 'text.secondary' }} noWrap>
            Project Name : &nbsp;
          </Typography>
          <Typography variant="h12" noWrap>
            {projectInfo.name}
          </Typography>
        </Grid>
        <Grid item md={6} xs={6}>
          {' '}
          <Typography variant="h10" sx={{ color: 'text.secondary' }} noWrap>
            Project ID : &nbsp;
          </Typography>
          <Typography variant="h12" noWrap>
            {projectInfo._id.substr(-5, 5)}
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="h10" sx={{ color: 'text.secondary' }} noWrap>
            General Objective : &nbsp;
          </Typography>
          <Typography variant="h12" noWrap>
            {projectInfo.generalObjective}
          </Typography>
        </Grid>
        <Grid item md={6} xs={2}>
          <Typography variant="h10" sx={{ color: 'text.secondary' }} noWrap>
            Specific objectives : &nbsp;
          </Typography>
          {projectInfo.specificObjectives.map((elem, index) => (
            <li key={index}>
              <Typography variant="p">
                {elem}
              </Typography>
            </li>
          ))}
        </Grid>
        <Grid container spacing={4} rowSpacing={1}>
          <Grid item md={6} xs={2}>
            <Typography variant="h10" sx={{ color: 'text.secondary' }} noWrap>
              Start date: &nbsp;
              <Typography variant="h12" noWrap>
                {projectInfo.startDate}
              </Typography>
            </Typography>
          </Grid>
          <Grid item md={6} xs={2}>
            <Typography variant="h10" sx={{ color: 'text.secondary' }} noWrap>
              End date: &nbsp;
              <Typography variant="h12" noWrap>
                {projectInfo.endDate}
              </Typography>
            </Typography>
          </Grid>
          <Grid item md={6} xs={2}>
            <Typography variant="h10" sx={{ color: 'text.secondary' }} noWrap>
              Budget: &nbsp;
            </Typography>
            <Typography variant="h12" noWrap>
              {projectInfo.budget}
            </Typography>
          </Grid>
          <Grid item md={6} xs={2}>
            <Typography variant="h10" sx={{ color: 'text.secondary' }} noWrap>
              Status: &nbsp;
            </Typography>
            <Typography variant="h12" noWrap>
              {projectInfo.status}
            </Typography>
          </Grid>
          <Grid item md={6} xs={2}>
            <Typography variant="h10" sx={{ color: 'text.secondary' }} noWrap>
              Leader: &nbsp;
            </Typography>
            <Typography variant="h12">
              {projectInfo.leader.name} {projectInfo.leader.lastName}
            </Typography>
          </Grid>
          <Grid item md={6} xs={2}>
            <Typography variant="h10" sx={{ color: 'text.secondary' }} noWrap>
              Leader ID: &nbsp;
            </Typography>
            <Typography variant="h12" noWrap>
              {projectInfo.leader._id}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
    </Card>
  );
}
