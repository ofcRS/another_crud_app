import { BasePost } from 'shared/types/Post';
import { deleteRequest, getRequest, postRequest } from 'utils/request';

export const submitPost = (post: BasePost) => postRequest('/posts')(post);
export const getPost = (id: number) => getRequest(`/posts/${id}`);
export const getPosts = () => getRequest('/posts');
export const deletePost = (id: number) => deleteRequest(`/posts/${id}`);
