import { CommentTreeElement, OnLeaveComment } from '../ViewPost.types';

export type Props = {
    commentsTree: CommentTreeElement[];
};

export type CommentProps = {
    onLeaveComment: OnLeaveComment;
    comment: CommentTreeElement;
    showReplay: boolean;
    onReplay: () => void;
    highlighted?: boolean;
};
