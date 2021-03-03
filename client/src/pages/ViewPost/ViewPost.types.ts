import { SetStateAction, Dispatch } from 'react';
import { EditorState } from 'draft-js';

import { PostCommentFragment, PostQuery } from 'graphql/generated';

export type Props = {};

export type OnLeaveComment = (text: string, replyId: number | null) => void;

export type ViewPostContext = {
    postId: number;
    onLeaveComment: OnLeaveComment;
    post: PostQuery['getPost'] | null;
    editorState: EditorState;
    setEditorState: Dispatch<SetStateAction<EditorState>>;
    commentsTree: CommentTreeElement[];
    setCommentsTree: Dispatch<SetStateAction<CommentTreeElement[]>>;
    lastAddedCommentId: LastAddedCommentId;
    replyingCommentId: ReplyingCommentId;
    setReplyingCommentId: Dispatch<SetStateAction<ReplyingCommentId>>;
};

/* Паршу комменты на клиенте,
 * потому что graphQL не поддерживает
 * рекурсию неизвестной глубины
 */
export type CommentTreeElement = Omit<PostCommentFragment, 'replies'> & {
    replies: CommentTreeElement[];
    data: PostCommentFragment;
};

export type LastAddedCommentId = number | null
export type ReplyingCommentId = number | null