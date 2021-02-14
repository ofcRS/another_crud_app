import { PostCommentFragment } from 'graphql/generated';

export type Props = {
    list: PostCommentFragment[];
};

export type CommentProps = {
    comment: PostCommentFragment;
};
