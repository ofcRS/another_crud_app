import { createContext } from 'react';
import { Context } from './PostCreating.types';

export const postCreatingContext = createContext<Context>({
    onAddPost: () => null,
});
