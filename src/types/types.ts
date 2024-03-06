export type User = {
    id: number,
    username: string,
    password: string,
    token: string
};

export type Publication = {
    id: number,
    categoryId: number,
    fileId: number,
    userId: number,
    dateTime: Date,
    description: string,
    fileUrl: string,
    username: string, 
    category: string
    likes: Like[],
    comments: Comment[],
};

export type Comment = {
    id: number,
    userId: number,
    publicationId: number,
    dateTime: Date,
    description: string,
    commentsReply: CommentReply[]
};

export type CommentReply = {
    id: number,
    userId: number,
    commentId: number,
    dateTime: Date,
    description: string
};

export type Like = {
    id: number,
    userId: number,
    publicationId: number
};

type Page = {
    route: string;
    title: string;
    name: string;
};

export const routes: Page[] = [
    {route: '/', title: 'Instagram - Página Inicial', name: 'Página Inicial' },
];