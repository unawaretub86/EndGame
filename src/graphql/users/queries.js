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
  query userById($id: ID!) {
    userById(_id: $id) {
      _id
      name
      lastName
      documentId
      email
    }
  }
`;

export { GET_USERS, GET_USER_BY_ID };
