import { gql } from '@apollo/client';

const GET_PROJECTS_ALL = gql`
  query allProjects {
    allProjects {
      _id
      name
      generalObjective
    }
  }
`;

// afrp- petición completa de projects. Tiene problemas con el leader{...}
// specificObjectives
// budget
// startDate
// endDate
// leader_id
// status
// phase
// leader{
//   _id
//   name
//   lastName
// }

const GET_PROJECT_BYID = gql`
  query ($id: ID!) {
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
      leader {
        _id
        name
        lastName
      }
    }
  }
`;

const GET_PROJECT_BYID_TOADMIN = gql`
  query ($id: ID!) {
    projectById(_id: $id) {
      _id
      name
      status
      phase
      startDate
      leader {
        _id
        name
        lastName
      }
    }
  }
`;

const GET_PROJECT_BYID_TOADVANCE = gql`
  query ($id: ID!) {
    projectById(_id: $id) {
      _id
      name
      status
      phase
      enrollments {
        _id
        project {
            _id
        }
      }
    }
  }
`;

const GET_PROJECTS_OF_LEADER = gql`
  query Query {
    projectByLeaderId {
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
      leader {
        _id
        email
        documentId
        name
        lastName
        status
        role
      }
      enrollments {
        _id
        project {
          name
        }
        student {
          name
        }
        status
        enrollmentDate
        egressDate
      }
    }
  }
`;

const GET_ENROLLMENTS_FROM_LEADER_PROJECTS = gql`
  query Query {
    projectByLeaderId {
      enrollments {
        _id
        project {
          name
        }
        student {
          name
        }
        status
        enrollmentDate
        egressDate
      }
    }
  }
`;

const GET_PROJECTS_BY_STATUS = gql`
  query projectByStatus($inStatus: projectStatus!) {
    projectByStatus(status: $inStatus) {
      _id
      name
      generalObjective
    }
  }
`;

const GET_PROJECTS_OFASTUDENT = gql`
  query projectsStudentEnrolled {
    projectsStudentEnrolled {
      _id
      name
      generalObjective
    }
  }
`;

// afrp- ojo con el leader{...}
export {
  GET_PROJECTS_ALL,
  GET_PROJECT_BYID,
  GET_PROJECT_BYID_TOADMIN,
  GET_PROJECTS_OF_LEADER,
  GET_PROJECTS_BY_STATUS,
  GET_PROJECTS_OFASTUDENT,
  GET_ENROLLMENTS_FROM_LEADER_PROJECTS,
  GET_PROJECT_BYID_TOADVANCE
};
