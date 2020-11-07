export type OnDeletePost = (id: number) => void;

export type PostsContext = {
    onDeletePost: OnDeletePost;
};
