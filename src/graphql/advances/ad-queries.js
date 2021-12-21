import { gql } from '@apollo/client';

const GET_ADVANCES = gql`
  query Query {
    allAdvances {
      _id
      addDate
      leaderDate
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

export { GET_ADVANCES };
