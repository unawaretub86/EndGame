import React from 'react';

export default function InfoProject() {
  
  // HABILITAR REAL >>>
  // const { data, error, loading } = useQuery(GET_PROJECT_INFO);
  // const projectInfo = data.project;
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error</p>;
  // <<<

  // POR AHORA >>>
  const projectInfo = {
      name: 'Proyecto 1',
      _id: '5RDXCFT5RDFGY65RFGYTR327',
      generalObjective: 'Objetivo general',
      specificObjectives: 'El objetivo especifico número 1$$El objetivo especifico número 2$$El objetivo especifico número 3',
      budget: '$11,000,000',
      startDate: '01/12/2020',
      endDate: '29/02/2021',
      leader_id: '123456789',
      status: 'En proceso',
      phase: 'started'
  };
  // <<<

  return(
    <>
      <ul>
        <li><h2>Project Name : {projectInfo.name}</h2></li>
        <li><h3>Project ID : {projectInfo._id} OJO '(*solo 4*)'</h3></li>
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
