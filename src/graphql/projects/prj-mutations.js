import { gql } from '@apollo/client';

const CREATE_PROJECT = gql`
    mutation addProject($input: AddProjectInput!) {
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

const UPDATE_PROJECT = gql`
    mutation UpdateProject($input: UpdateProjectInput!) {
        updateProject(input: $input) {
            _id
            name
        }
    }
`;

export {
    CREATE_PROJECT, UPDATE_PROJECT
};
