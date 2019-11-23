import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';

import { Post } from 'views/components/Post';
import { CreatePost } from 'views/components/CreatePost';

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
        fetchPosts()
    }, []);

    return (
        <div>
            <CreatePost
                fetchPosts={fetchPosts}
            />
            {
                posts.map((post) => <Post
                    key={post.id}
                    data={post}
                />)
            }
        </div>
    );
};

export default Main;