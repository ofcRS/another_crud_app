import axios from './axios';
import { getToken } from './auth';
import { AxiosResponse } from 'axios';

const getConfig = () => ({
    headers: {
        Authorization: getToken(),
    },
});

type BaseResponse = {
    isOk: boolean;
    data?: object;
};

export const getRequest = <R>(url: string): Promise<AxiosResponse<R>> =>
    axios.get(url);

export const postRequest = <T, R = BaseResponse>(url: string) => (
    body: T
): Promise<AxiosResponse<R>> => axios.post(url, body, getConfig());

export const deleteRequest = <R = BaseResponse>(
    url: string
): Promise<AxiosResponse<R>> => axios.delete(url, getConfig());
