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

const validateResponse = async (response: Response) => {
    if (response.status < 200 || response.status > 399) {
        throw response;
    }
    const data = await response.json();
    if (!data.ok) {
        throw response;
    }
    return data.data;
};

export const getApiUrl = () =>
    `http://${process.env.API_HOST}:${process.env.API_PORT}`;

export const request = async <
    Response = unknown,
    Body = undefined,
    Params extends Record<string, unknown> = Record<string, unknown>
>({
    method = 'get',
    url,
    params,
    headers,
}: {
    url: string;
    method?: 'get' | 'post' | 'delete' | 'put';
    params?: Params;
    headers?: Record<string, string>;
}): Promise<Response> => {
    let urlWithParams = url;
    if (params) {
        urlWithParams += `?${stringifySearchParams(params)}`;
    }
    let formattedUrl = `${getApiUrl()}/api`;
    if (urlWithParams[0] === '/') {
        formattedUrl += urlWithParams;
    } else {
        formattedUrl += `/${urlWithParams}`;
    }

    const result = await window.fetch(formattedUrl, {
        method,
        credentials: 'include',
        headers,
    });
    return await validateResponse(result);
};

