import { User, RecordUser } from 'shared/types/User';
import { postRequest } from 'utils/request';

export const loginRequest = (user: User) =>
    postRequest<User, { token: string }>('/auth/login')(user);
