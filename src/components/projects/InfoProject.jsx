import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { Typography, Box } from '@mui/material';
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
  const { data, error, loading } = resp
  console.log('Info Project ~ data ~ ', data,
              'Info Project ~ error ~ ', error,
              'Info Project ~ loadingQuery ~ ', loading); 
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  
  const projectInfo = data.projectById;
  
  return(
    <>
      <Box>
        <Typography variant="h10" sx={{ color: 'text.secondary' }} noWrap>
          Project Name : &nbsp;
        </Typography>
        <Typography variant="h12"  noWrap>
          {projectInfo.name}
        </Typography>
      </Box>
      <Box>  {/* sx={{ minWidth: 240 }} */}
        <Typography variant="h10" sx={{ color: 'text.secondary' }} noWrap>
          Project ID : &nbsp;
        </Typography>
        <Typography variant="h12"  noWrap>
          {projectInfo._id.substr(-5,5)}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h10" sx={{ color: 'text.secondary' }} noWrap>
          General Objective : &nbsp;
        </Typography>
        <Typography variant="h12"  noWrap>
          {projectInfo.generalObjective}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h10" sx={{ color: 'text.secondary' }} noWrap>
          Specific objectives : &nbsp;
        </Typography>
        <ul>
          {projectInfo.specificObjectives.map((elem, index) => 
            <li key={index}><Typography variant="p"  noWrap>&nbsp;&nbsp;&nbsp;{elem}</Typography></li>
          )}
        </ul>
      </Box>
      <ul>
        
        <li><h2>Start date: {projectInfo.startDate}</h2></li>
        <li><h2>End date: {projectInfo.endDate}</h2></li>
        <li><h2>Project details</h2></li>
        <li><h3>Budget: {projectInfo.budget}</h3></li>
        <li><h3>Status: {projectInfo.status}</h3></li>
        <li><h3>Leader: {projectInfo.leader.name} {projectInfo.leader.lastName}</h3></li>
        <li><h3>Leader ID: {projectInfo.leader._id}</h3></li>
      </ul>
    </>
  );
}