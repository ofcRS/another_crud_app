import axios from 'axios';
import { getToken } from './auth';

const getHeaders = (): object => ({
    'Content-Type': 'application/json',
});

const instance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: getHeaders(),
    withCredentials: true,
});

export default instance;
