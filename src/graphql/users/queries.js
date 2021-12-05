import { gql } from '@apollo/client';

const GET_USERS = gql`
  query allUsers {
    allUsers {
      _id
      name
      lastName
      documentId
      email
      role
    }
  }
`;

const GET_USER = gql`
  query ($_id: String!) {
    User(_id: $_id) {
      _id
      firstName
      lastName
      identification
      email
      role
    }
  }
`;

export { GET_USERS, GET_USER };
