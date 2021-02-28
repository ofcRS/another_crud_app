import { CommentTreeElement } from '../ViewPost.types';

export type Props = {
    commentsTree: CommentTreeElement[];
};

export type CommentProps = {
    comment: CommentTreeElement;
    showReplay: boolean;
    onReplay: () => void;
};
