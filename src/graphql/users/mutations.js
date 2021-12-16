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

const UPDATE_STATE_LEADER = gql`
  mutation updateStateLeader($input: UpdateStateLeaderInput!) {
    updateStateLeader(input: $input) {
      _id
      status
    }
  }
`;

const CREATE_USER = gql`
  mutation registerUser($input: RegisterInput!) {
    registerUser(input: $input)
  }
`;

const LOGIN_USER = gql`
mutation Login($input: LoginInput!) {
  login(input: $input)
}
`;

export { UPDATE_USER, UPDATE_STATE_ADMIN, CREATE_USER, LOGIN_USER, UPDATE_STATE_LEADER }
