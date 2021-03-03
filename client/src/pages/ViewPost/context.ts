import { createContext } from 'react';

import { ViewPostContext } from './ViewPost.types';
import { EditorState } from 'draft-js';

export const viewPostContext = createContext<ViewPostContext>({
    lastAddedCommentId: null,
    onLeaveComment: () => null,
    postId: -1,
    post: null,
    setEditorState: () => null,
    editorState: EditorState.createEmpty(),
    commentsTree: [],
    setCommentsTree: () => null,
    replyingCommentId: null,
    setReplyingCommentId: () => null,
});
