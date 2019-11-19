export type BasePost = {
    title: string;
    body: string;
}

export type RecordPost = BasePost & {
    id: number;
}