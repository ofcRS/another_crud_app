import { SetStateAction, Dispatch } from 'react';
import { EditorState } from 'draft-js';

import { PostQuery } from 'graphql/generated';

export type Props = {};

export type ViewPostContext = {
    postId: number;
    onLeaveComment: (text: string) => void;
    post: PostQuery['getPost'] | null;
    editorState: EditorState;
    setEditorState: Dispatch<SetStateAction<EditorState>>;
};
