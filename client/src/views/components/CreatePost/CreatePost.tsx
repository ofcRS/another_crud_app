import React, { useState } from 'react';

const CreatePost = (): JSX.Element => {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');

    return (
        <div style={{
            width: 300,
            border: '1px solid black'
        }}>
            <input value={title} onChange={e => setTitle(e.target.value)} />
            <textarea value={body} onChange={e => setBody(e.target.value)} />
        </div>
    );
};

export default CreatePost;