import { createContext } from 'react';
import { PostsContext } from './Posts.types';

export const postsContext = createContext<PostsContext>({
    onDeletePost: () => null,
    onSelectPost: () => null,
    selectedPost: null,
    skip: 0,
    setSkip: () => null,
    postsPreviews: [],
    totalItems: 0,
});
