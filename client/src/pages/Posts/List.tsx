import React from 'react';
import { observer } from 'mobx-react';

import { Post } from './Post';

import { usePostQuery } from 'graphql/generated';

export const List: React.FC = observer(() => {
    const { data } = usePostQuery();

    return (
        <>
            {data?.posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </>
    );
});
