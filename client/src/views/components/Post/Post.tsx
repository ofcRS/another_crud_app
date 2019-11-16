import React from 'react';

import { Props } from './Post.types';

const Post = ({data}: Props): JSX.Element => {
    return (
        <div>
            <h3>{data.title}</h3>
            <p>{data.body}</p>
        </div>
    );
};

export default Post;