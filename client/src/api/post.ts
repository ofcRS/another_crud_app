import axios from 'utils/axios';
import { BasePost } from 'shared/types/Post';

export const submitPost = (post: BasePost) => axios.post('/post', post);

export const getPost = (id: number) => axios.get(`post/${id}`);