import { gql } from '@apollo/client';

const GET_USERS = gql`
  query allUsers {
    allUsers {
      _id
      name
      lastName
      role
      status
    }
  }
`;

const GET_USER_BY_ID = gql`
  query ($id: ID) {
    userById(_id: $id) {
      _id
      name
      lastName
      documentId
      email
    }
  }
`;

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      name
      lastName
      documentId
      email
      role
      status
    }
  }
`;

export { GET_USERS, GET_USER_BY_ID, LOGIN_USER };
