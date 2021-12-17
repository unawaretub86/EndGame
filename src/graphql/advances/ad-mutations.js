import { gql } from '@apollo/client';

const CREATE_ADVANCE = gql`
    mutation CreateAdvance($input: AdvanceInput!) {
        createAdvance(input: $input) {
        }
    }
`;	