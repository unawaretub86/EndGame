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

const ACTIVATE_PROJECT = gql`
    mutation activateProject($input: ActivateProjectInput!) {
        activateProject(input: $input) {
            _id
            name
            status
            phase
        }
    }
`;

const INACTIVATE_PROJECT = gql`
    mutation inactivateProject($input: InactivateProjectInput!) {
        inactivateProject(input: $input) {
            _id
            name
            status
            phase
        }
    }
`;

const UPD_PHASE_PROJECT = gql`
    mutation changePhaseProject($input: changePhaseInput!) {
        changePhaseProject(input: $input) {
            _id
            name
            status
            phase
        }
    }
`;


export {
    CREATE_PROJECT, UPDATE_PROJECT, ACTIVATE_PROJECT, INACTIVATE_PROJECT, UPD_PHASE_PROJECT
};
