import React, { useState } from 'react';

import { Post } from './Post';
import { CreatePost } from './CreatePost';

import { usePostQuery } from 'graphql/generated';

import { RecordPost } from 'shared/types/Post';

export const List = (): JSX.Element => {
    const [posts, setPost] = useState<RecordPost[]>([]);
    const { loading, data, refetch } = usePostQuery({
        fetchPolicy: 'network-only',
    });

    return (
        <div>
            <button onClick={() => refetch()}>test</button>
            <CreatePost fetchPosts={refetch} />
            {data?.posts.map(post => (
                <Post refreshList={refetch} key={post.id} data={post} />
            ))}
        </div>
    );
};
