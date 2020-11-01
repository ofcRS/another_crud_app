import React from 'react';
import { observer } from 'mobx-react';

import { Post } from './Post';

import { usePostQuery } from 'graphql/generated';

import { FetchDataWrapper } from './FetchDataWrapper';

export const List: React.FC = observer(() => {
    const { data } = usePostQuery();

    return (
        <FetchDataWrapper>
            {data?.posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
            {data?.posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
            {data?.posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
            {data?.posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
            {data?.posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
            {data?.posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
            {data?.posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
            {data?.posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </FetchDataWrapper>
    );
});
