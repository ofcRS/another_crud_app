import React from 'react';

import { Comment } from './Comment';
import { Props } from './PostComments.types';

export const PostComments: React.FC<Props> = ({ list }) => {
    return (
        <div>
            {list.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    );
};
