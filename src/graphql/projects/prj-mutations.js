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
        }
    }
`;

export {
    CREATE_PROJECT,
};
