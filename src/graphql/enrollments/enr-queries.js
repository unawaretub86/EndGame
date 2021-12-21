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

const GET_ENROLLMENTS_OFSTUDENT = gql`
  query enrollmentByUserId($user_id: ID!) {
    enrollmentByUserId(user_id: $user_id) {
      _id
      project_id
      status
    }
  }
`;

export { GET_ENROLLMENTS,GET_ENROLLMENTS_OFSTUDENT };
