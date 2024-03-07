import { gql } from '@apollo/client';

export const LIKE = gql`
    mutation AddPublicationLike($input: LikeInput!) {
        addPublicationLike(input: $input){
            id
            name
            photoURL
            publicationId
            userId
            username
        }
    }
`;

export const DESLIKE = gql`
    mutation DeletePublicationLike($input: LikeInput!) {
        deletePublicationLike(input: $input)
    }
`;