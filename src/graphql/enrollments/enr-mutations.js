import { gql } from '@apollo/client';

const CHANGE_STATUS_ENROLLMENT = gql`
  mutation changeStatusEnrollment($input: UpdateStateAdminInput!) {
    changeStatusEnrollments(input: $input) {
      _id
      status
    }
  }
`;
export { CHANGE_STATUS_ENROLLMENT };
