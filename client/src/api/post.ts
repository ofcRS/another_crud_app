import axios from 'utils/axios';
import { BasePost } from 'shared/types/Post';

export const submitPost = (post: BasePost) => axios.post('/posts', post);

export const getPost = (id: number) => axios.get(`/posts/${id}`);

export const getPosts = () => axios.get('/posts');

export const deletePost = (id: number) => axios.delete(`/posts/${id}`);
