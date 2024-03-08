import { gql } from '@apollo/client';

export const FindMany = gql`
    query Publications($input: PublicationInput!) {
        publications(input: $input) {
            error
            message
            data {
                id
                categoryId
                fileId
                userId
                dateTime
                description
                comments {
                    id
                    userId
                    publicationId
                    dateTime
                    description
                    username
                    photoURL
                    commentsReply {
                        id
                        userId
                        commentId
                        commentReplyId
                        dateTime
                        description
                        username
                        photoURL
                        likes {
                            id
                            userId
                            commentId
                            commentReplyId
                            name
                            username
                            photoURL
                        }
                    }
                    likes {
                        id
                        userId
                        commentId
                        commentReplyId
                        name
                        username
                        photoURL
                    }
                }
                fileUrl
                username
                category
                type
                views
                likes {
                    id
                    userId
                    publicationId
                    username
                    name
                    photoURL
                }
            }
        }
    }
`;