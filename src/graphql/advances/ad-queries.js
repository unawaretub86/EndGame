import { gql } from '@apollo/client';

const GET_ADVANCES = gql`
  query allAdvances {
    allAdvances {
      _id
      addDate
      leaderDate
      description
      observations
      enrollment {
        project {
          name
        }
        student {
          name
          lastName
        }
      }
    }
  }
`;

const ADVANCE_BY_ID = gql`
  query Query($id: ID!) {
    advaceById(_id: $id) {
      _id
      addDate
      leaderDate
      description
      observations
    }
  }
`;

const ADVANCES_BY_LEADER_ID = gql`
  query Query {
    advancesByLeaderId {
      _id
      addDate
      leaderDate
      observations
      description
      enrollment {
        project {
          name
        }
        student {
          name
          lastName
        }
      }
    }
  }
`;

const ADVANCES_BY_STUDENT_ID = gql`
  query Query {
    advancesByStudentId {
      _id
      addDate
      leaderDate
      observations
      description
      enrollment {
        project {
          name
        }
        student {
          name
          lastName
        }
      }
    }
  }
`;


export { GET_ADVANCES, ADVANCE_BY_ID, ADVANCES_BY_LEADER_ID, ADVANCES_BY_STUDENT_ID };
