import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';

import { Post } from './components/Post';
import { CreatePost } from './components/CreatePost';
import { MoreButton } from 'components/Button/MoreButton';

import { getPosts } from 'api/post';

import { RecordPost } from 'shared/types/Post';

const Main = (): JSX.Element => {
    const [posts, setPost] = useState<RecordPost[]>([]);

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
            <CreatePost fetchPosts={fetchPosts} />
            {posts.map(post => (
                <Post refreshList={fetchPosts} key={post.id} data={post} />
            ))}
        </div>
    );
};

export default Main;
