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

export const stringifySearchParams = (
    data: Record<string, unknown>
): string => {
    Object.keys(data).forEach(key => {
        if (typeof data[key] === 'object') {
            data[key] = JSON.stringify(data[key]);
        }
    });

    return new window.URLSearchParams(
        data as { [key: string]: string }
    ).toString();
};

export const request = async <
    Body = undefined,
    Response = unknown,
    Params extends Record<string, unknown> = Record<string, unknown>
>({
    method = 'get',
    url,
    params,
}: {
    url: string;
    method?: 'get' | 'post' | 'delete' | 'put';
    params?: Params;
}): Promise<Response> => {
    let urlWithParams = url;
    if (params) {
        urlWithParams += `?${stringifySearchParams(params)}`;
    }
    let formattedUrl = `${process.env.API_URL!}`;
    if (urlWithParams[0] === '/') {
        formattedUrl += urlWithParams;
    } else {
        formattedUrl += `/${urlWithParams}`;
    }

    const result = await window.fetch(formattedUrl, {
        method,
        credentials: 'include',
    });
    return await result.json();
};
