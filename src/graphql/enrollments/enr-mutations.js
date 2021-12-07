import { gql } from '@apollo/client';

const ENROLLMENT_STATUS = gql`
  mutation EnrollmentStatus($input: UpdateStateAdminInput!) {
    UEnrollmentStatus(input: $input) {
      accepted
      rejected
    }
  }
`;
export { ENROLLMENT_STATUS };
