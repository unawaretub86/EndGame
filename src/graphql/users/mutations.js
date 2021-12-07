import { gql } from '@apollo/client';

const EDIT_USER = gql`
  mutation ($input: EditUser!) {
    editUser(input: $input) {
      name
      lastName
      documentId
      email
      password
    }
  }
`;

const UPDATE_STATE_ADMIN = gql`
  mutation UpdateUser($input: UpdateStateAdminInput!) {
    updateStateAdmin(input: $input) {
      _id
      status
    }
  }
`;
export { EDIT_USER, UPDATE_STATE_ADMIN };
