export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

export interface Comment {
    id: string;
    content: string;
    postId: string;
    authorId: string;
    createdAt: string;
    author: Pick<User, "id" | "name">;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    authorId: string;
    createdAt: string;
    author: Pick<User, "id" | "name">;
    comments: Comment[];
}

export interface PostSummary {
    id: string;
    title: string;
    createdAt: string;
    author: Pick<User, "id" | "name">;
}