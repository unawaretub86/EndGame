import { gql } from '@apollo/client';

const GET_ADVANCES = gql`
  query Query {
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

export { GET_ADVANCES, ADVANCE_BY_ID };
