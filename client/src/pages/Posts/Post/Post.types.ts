import { RecordPost } from 'shared/types/Post';

export type Props = {
    data: RecordPost;
    refreshList: () => void;
};
