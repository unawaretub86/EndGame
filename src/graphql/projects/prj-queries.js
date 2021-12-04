import { gql } from '@apollo/client';

const GET_PROJECTS_ALL = gql`
  query AllProjects {
    allProjects {
      _id
      name
      generalObjective
      specificObjectives
      budget
      startDate
      endDate
      leader_id
      status
      phase
      leader{
        _id
        name
        lastName
      }
    }
  }
`;

const GET_PROJECT_ID = gql`
  query ($id: ID) {
    projectById(_id: $id) {
      _id
      name
      generalObjective
      specificObjectives
      budget
      startDate
      endDate
      status
      phase
      leader{
        _id
        name
        lastName
      }
    }
  }
`;

export { GET_PROJECTS_ALL, GET_PROJECT_ID};