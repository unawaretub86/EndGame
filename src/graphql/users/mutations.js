import { gql } from '@apollo/client';

const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      _id
      email
      documentId
      name
      lastName
      status
    }
  }
`;

const UPDATE_STATE_ADMIN = gql`
  mutation updateStateAdmin($input: UpdateStateAdminInput!) {
    updateStateAdmin(input: $input) {
      _id
      status
    }
  }
`;
export { UPDATE_USER, UPDATE_STATE_ADMIN };
