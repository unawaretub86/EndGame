import { gql } from '@apollo/client';

const CREATE_ADVANCE = gql`
    mutation addAdvance($input: AddAdvanceInput!) {
        addAdvance(input: $input) {
            _id
        }
    }
`;

export { CREATE_ADVANCE };