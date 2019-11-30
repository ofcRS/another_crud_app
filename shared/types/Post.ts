import { Record } from './utility';

export type BasePost = {
    title: string;
    body: string;
}

export type RecordPost = Record<BasePost>