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
    Response = unknown,
    Body = undefined,
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
