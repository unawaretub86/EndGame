import { gql } from '@apollo/client';

const GET_ADVANCES = gql`
  query allAdvances {
    allAdvances {
      _id
      enrollment {
        project {
          name
        }
        student {
          name
        }
      }
      addDate
      description
      leaderId
      observations
    }
  }
`;

export { GET_ADVANCES };
