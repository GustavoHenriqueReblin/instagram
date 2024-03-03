import { gql } from '@apollo/client';

export const FindOne = gql`
    query User($input: UserInput!) {
        user(input: $input) {
            data {
                id
                name
                email
                password
                token
            }
            error
            message
        }
    }
`;

export const FindOneByToken = gql`
    query GetUserByToken($input: UserInput!) {
        getUserByToken(input: $input) {
            data {
                id
                name
                email
                password
                token
            }
            error
            message
        }
    }
`;