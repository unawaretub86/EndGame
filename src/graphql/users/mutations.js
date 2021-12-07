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

const UPDATE_STATE_LEADER = gql`
  mutation ($input: UpdateStateLeader!) {
    UpdateStateLeader(input: $input) {
      Enum_updateStateLeader
    }
  }
`;
export { EDIT_USER, UPDATE_STATE_LEADER };
