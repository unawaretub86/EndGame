import React from 'react';
import PropTypes from 'prop-types';

// >>> ejemplo BORRAR luego
import dataProjectsInfoAll from '../../graphql/test-mientras/jsons-de-prueba'
// ejemplo <<<

InfoProject.propTypes = {
  firstProjectData: PropTypes.object
};

export default function InfoProject({ firstProjectData }) {
  
  // HABILITAR REAL >>>
  // const { data, error, loading } = useQuery(GET_PROJECT_INFO);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error</p>;
  // <<<

  // POR AHORA >>>
  const data = dataProjectsInfoAll.filter((proj)=>(proj._id === firstProjectData._id))
  const projectInfo = data.project;
  
  return(
    <>
      <ul>
        <li><h2>Project Name : {projectInfo.name}</h2></li>
        <li><h3>Project ID : {projectInfo._id.substr(-4,4)} OJO '(*solo 4*)'</h3></li>
        <li><h2>General Objective:</h2></li>
        <li><p>{projectInfo.generalObjective}</p></li>
        <li><h2>Specific objectives</h2></li>
        <li><ul>
          {projectInfo.specificObjectives.split('$$').map((elem, index) => 
            <li key={index}><p>{elem}</p></li>
          )}
        </ul></li>
        <li><h2>Start date: {projectInfo.startDate}</h2></li>
        <li><h2>End date: {projectInfo.endDate}</h2></li>
        <li><h2>Project details</h2></li>
        <li><h3>Budget: {projectInfo.budget}</h3></li>
        <li><h3>Status: {projectInfo.status}</h3></li>
        <li><h3>Manager: {projectInfo.leader_id}</h3></li>
        <li><h3>Manager ID: {projectInfo.leader_id}</h3></li>
      </ul>
    </>
  );
}