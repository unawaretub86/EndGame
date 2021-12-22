import { gql } from '@apollo/client';

const CREATE_ADVANCE = gql`
    mutation addAdvance($input: AddAdvanceInput!) {
        addAdvance(input: $input) {
            _id
        }
    }
`;

const ADD_OBSERVATION = gql`
    mutation addObservation($input: AddObservationInput!) {
        addObservation(input: $input) {
            _id
        }
    }
`;

const UPDATE_ADVANCE = gql`
    mutation updateAdvance($input: updateAdvanceInput!) {
        updateAdvance(input: $input) {
            _id
        }
    }
`;


export { CREATE_ADVANCE, ADD_OBSERVATION, UPDATE_ADVANCE };