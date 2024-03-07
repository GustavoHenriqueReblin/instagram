import { gql } from '@apollo/client';

export const FindMany = gql`
    query Publications($input: PublicationInput!) {
        publications(input: $input) {
            data {
                id
                categoryId
                fileId
                userId
                dateTime
                description
                fileUrl
                username
                category
                type
                comments {
                    description
                    userId
                    username
                    photoURL
                    commentsReply {
                        commentId
                        photoURL
                        dateTime
                        description
                        username
                    }
                }
                likes {
                    id
                    userId
                    username
                    name
                    photoURL
                }
            }
            error
            message
        }
    }
`;