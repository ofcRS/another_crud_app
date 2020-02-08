type InMemoryToken = { token: string; expiry?: string };

let inMemoryToken: InMemoryToken | undefined;

type Login = (token: InMemoryToken, noRedirect?: boolean) => void;

export const login: Login = ({ token, expiry }, noRedirect) => {
    inMemoryToken = {
        token,
        expiry,
    };
    if (!noRedirect) {
    }
};

export const getToken = (): string => inMemoryToken ? inMemoryToken.token : '';
