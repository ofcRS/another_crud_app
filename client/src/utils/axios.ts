import axios from 'axios';

const getHeaders = (): object => ({
    'Content-Type': 'application/json',
});

const instance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: getHeaders(),
});

export default instance;
