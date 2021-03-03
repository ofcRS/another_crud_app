import { CommentTreeElement, OnLeaveComment } from '../ViewPost.types';

export type Props = {
    commentsTree: CommentTreeElement[];
    showBranchIndicator?: boolean;
    onClickBranchIndicator?: () => void;
};

export type CommentProps = {
    onLeaveComment: OnLeaveComment;
    comment: CommentTreeElement;
    showReplay: boolean;
    onReplay: () => void;
    highlighted?: boolean;
};
