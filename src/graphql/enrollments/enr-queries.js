import { gql } from '@apollo/client';

const GET_ENROLLMENTS = gql`
  query allEnrollments {
    allEnrollments {
      project {
        _id
        name
      }
      student {
        _id
      }
      status
      enrollmentDate
      egressDate
    }
  }
`;

export { GET_ENROLLMENTS };
