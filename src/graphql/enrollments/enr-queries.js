import { gql } from '@apollo/client';

const GET_ENROLLMENTS = gql`
  query allEnrollments {
    allEnrollments {
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
`;

export { GET_ENROLLMENTS };
