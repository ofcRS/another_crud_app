import { PostPreview } from 'graphql/generated';

export type SelectedPost = PostPreview | null;

export type OnDeletePost = (id: number) => void;
export type OnSelectPost = (post: SelectedPost) => void;

export type PostsContext = {
    onDeletePost: OnDeletePost;
    onSelectPost: OnSelectPost;
    selectedPost: SelectedPost;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    postsPreviews: PostPreview[];
    totalItems: number;
};
