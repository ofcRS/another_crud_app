import React, { useState } from 'react';

import { observer } from 'mobx-react';

import { Styled } from './CreatePost.styles';
import { Props } from './CreatePost.types';

export const CreatePost = observer(({ fetchPosts }: Props) => {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');

    return (
        <Styled.CreatePost onSubmit={console.log}>
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
