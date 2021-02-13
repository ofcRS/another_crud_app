import { PostPreview } from 'graphql/generated';
import { SetStateAction, Dispatch } from 'react';

export type SelectedPost = PostPreview | null;

export type OnDeletePost = (id: number) => void;
export type OnSelectPost = (post: SelectedPost) => void;
export type FetchMorePostsPreviews = (skip: number, take: number) => void

export type PostsContext = {
    onDeletePost: OnDeletePost;
    onSelectPost: OnSelectPost;
    selectedPost: SelectedPost;
    skip: number;
    setSkip: Dispatch<SetStateAction<number>>;
    postsPreviews: PostPreview[];
    totalItems: number;
};
