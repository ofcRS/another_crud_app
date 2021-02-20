import { SetStateAction, Dispatch } from 'react';
import { EditorState } from 'draft-js';

import { PostCommentFragment, PostQuery } from 'graphql/generated';

export type Props = {};

export type OnLeaveComment = (text: string, replayId: number) => void;

export type ViewPostContext = {
    postId: number;
    onLeaveComment: OnLeaveComment;
    post: PostQuery['getPost'] | null;
    editorState: EditorState;
    setEditorState: Dispatch<SetStateAction<EditorState>>;
    commentTree: CommentTreeElement[];
    setCommentTree: Dispatch<SetStateAction<CommentTreeElement[]>>;
};

/* Паршу комменты на клиенте,
 * потому что graphQL не поддерживает
 * рекурсию неизвестной глубины
 * */
export type CommentTreeElement = PostCommentFragment & {
    comments: PostCommentFragment[];
};
