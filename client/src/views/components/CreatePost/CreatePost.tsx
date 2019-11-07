import React, { useState } from 'react';

import { submitPost } from 'api/post';

const CreatePost = (): JSX.Element => {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        submitPost({
            body,
            title
        })
            .then((res) => {
                console.log(res)
            })
    };

    return (
        <form
            style={{
            width: 300,
            border: '1px solid black'
        }}
            onSubmit={handleSubmit}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <input value={title} onChange={e => setTitle(e.target.value)}/>
                <button type={'submit'}>submit</button>
            </div>
            <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                style={{
                    width: 300,
                    padding: 0,
                    margin: 0,
                }}
            />
        </form>
    );
};

export default CreatePost;