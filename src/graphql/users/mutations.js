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

export { EDIT_USER };
