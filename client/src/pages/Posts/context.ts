import { createContext } from 'react';
import { PostsContext } from './Posts.types';

export const postsContext = createContext<PostsContext>({
    onDeletePost: () => null,
    onAddPost: () => null,
});
