import { gql } from '@apollo/client';

const CHANGE_STATUS_ENROLLMENT = gql`
  mutation changeStatusEnrollment($input: changeStatusInput!) {
    changeStatusEnrollment(input: $input) {
      _id
      status
    }
  }
`;

const ADD_ENROLLMENT = gql`
  mutation AddEnrollment($input: addEnrollmentInput!) {
    addEnrollment(input: $input) {
      _id
      status
      enrollmentDate
      project {
        leader{
          name
        }
      }
    }
  }
`;

export { CHANGE_STATUS_ENROLLMENT, ADD_ENROLLMENT };
