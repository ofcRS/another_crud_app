import { Post } from 'graphql/generated';

export type Props = {
    data: Post;
    refreshList: () => void;
};
