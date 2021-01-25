import { createContext } from 'react';
import { PostsContext } from './Posts.types';

export const postsContext = createContext<PostsContext>({
    onDeletePost: () => null,
    onSelectPost: () => null,
    selectedPost: null,
    currentPage: 0,
    setCurrentPage: () => null,
    postsPreviews: [],
    totalItems: 0,
});
