import axios from 'axios';
import { getToken } from './auth';

const getHeaders = (): object => ({
    'Content-Type': 'application/json',
});

const instance = axios.create({
    baseURL: 'http://192.168.1.170:3001/api',
    headers: getHeaders(),
    withCredentials: true,
});

export default instance;
