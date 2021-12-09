import { gql } from '@apollo/client';

const UPDATE_USER = gql`
  mutation updateUser(
    $_id: String!
    $name: String!
    $lastName: String!
    $documentId: String!
    $email: String!
  ) {
    upateUser(
      _id: $_id
      name: $name
      lastName: $lastName
      documentId: $documentId
      email: $_email
    ) {
      _id
      name
      lastName
      documentId
      email
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
