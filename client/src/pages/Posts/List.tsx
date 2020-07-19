import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';

import { Post } from './Post';
import { CreatePost } from './CreatePost';

import { getPosts } from 'api/post';
import { usePostQuery } from 'graphql/generated/graphql';

import { RecordPost } from 'shared/types/Post';

export const List = (): JSX.Element => {
    const [posts, setPost] = useState<RecordPost[]>([]);
    const { loading, data, refetch } = usePostQuery();

    const fetchPosts = async (): Promise<void> => {
        const response: AxiosResponse = await getPosts();
        if (response.statusText === 'OK') {
            setPost(response.data.list);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <button onClick={() => refetch()}>test</button>
            <CreatePost fetchPosts={fetchPosts} />
            {posts.map(post => (
                <Post refreshList={fetchPosts} key={post.id} data={post} />
            ))}
        </div>
    );
};
