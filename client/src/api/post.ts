import axios from 'utils/axios';
import { Post } from 'shared/types/Post';

export const submitPost = (post: Post) => axios.post('/post', post);

export const getPost = (id: number) => axios.get(`post/${id}`);