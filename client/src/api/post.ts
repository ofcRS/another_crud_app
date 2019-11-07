import axios from 'utils/axios';
import { Post } from 'shared/types/Post';

export const submitPost = (post: Post) => axios.post('/post', post);
