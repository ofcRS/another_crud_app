import axios from 'utils/axios';

import { User, RecordUser } from 'shared/types/User';

export const login = (user: User): Promise<RecordUser> =>
    axios.post<User, RecordUser>('/login', user);
