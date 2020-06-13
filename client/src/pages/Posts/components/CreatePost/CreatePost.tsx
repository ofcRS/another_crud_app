import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { observer } from 'mobx-react';

import { submitPost } from 'api/post';
import { Styled } from './CreatePost.styles';
import { Props } from './CreatePost.types';
import { useStore } from 'store/store';

export const CreatePost = observer(({ fetchPosts }: Props) => {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const store = useStore();

    const clearForm = (): void => {
        setTitle('');
        setBody('');
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        const response: AxiosResponse = await submitPost({
            body,
            title,
        });
        if (response.data.isOk) {
            clearForm();
            fetchPosts();
        }
    };

    return (
        <Styled.CreatePost onSubmit={handleSubmit}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <input
                    tabIndex={1}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <button tabIndex={3} type={'submit'}>
                    submit
                </button>
            </div>
            <textarea
                tabIndex={2}
                value={body}
                onChange={e => setBody(e.target.value)}
                style={{
                    width: 300,
                    padding: 0,
                    margin: 0,
                }}
            />
        </Styled.CreatePost>
    );
});
