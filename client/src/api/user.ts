import axios from 'utils/axios';

import { User, RecordUser } from 'shared/types/User';
import { AxiosResponse } from 'axios';
import { getToken } from '../utils/auth';

export const loginRequest = (
    user: User
): Promise<AxiosResponse<{ token: string }>> =>
    axios.post<User, AxiosResponse<{ token: string }>>('/auth/login', user);
