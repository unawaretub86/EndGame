import { gql } from '@apollo/client';

const CREATE_PROJECT = gql`
    mutation ($input: AddProjectInput!) {
        addProject(input: $input) {
            _id
            name
            generalObjective
            specificObjectives
            budget
            startDate
            endDate
            leader_id
            leader{
                _id
                name
                lastName
            }
        }
    }
`;

export {
    CREATE_PROJECT,
};
