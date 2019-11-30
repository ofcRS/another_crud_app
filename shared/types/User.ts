import { Record } from './utility'

export type User = {
    email: string;
    password: string;
}

export type RecordUser = Record<User>