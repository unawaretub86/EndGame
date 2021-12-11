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

const GET_STUDENTS = gql`
  query Query {
    allStudents {
      _id
      email
      documentId
      name
      lastName
      status
      role
    }
  }
`;

export { GET_USERS, GET_USER_BY_ID, GET_STUDENTS };
