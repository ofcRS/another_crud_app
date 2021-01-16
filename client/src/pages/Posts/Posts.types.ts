import { Post } from 'graphql/generated';

export type SelectedPost = Post | null;

export type OnDeletePost = (id: number) => void;
export type OnSelectPost = (post: SelectedPost) => void;

export type PostsContext = {
    onDeletePost: OnDeletePost;
    onSelectPost: OnSelectPost;
    selectedPost: SelectedPost;
};
