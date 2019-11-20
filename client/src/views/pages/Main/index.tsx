import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';

import { Post } from 'views/components/Post';
import { CreatePost } from 'views/components/CreatePost';

import { getPosts } from 'api/post';

import { RecordPost } from 'shared/types/Post';

const Main = (): JSX.Element => {
    const [posts, setPost] = useState<RecordPost[]>([]);

    useEffect(() => {
        getPosts()
            .then((response: AxiosResponse) => {
                if (response.statusText === 'OK') {
                    setPost(response.data.list);
                }
            });
    }, []);

    return (
        <div>
            <CreatePost/>
            {
                posts.map(post => <Post
                    key={post.id}
                    data={post}
                />)
            }
        </div>
    );
};

export default Main;