import React, { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';

import { Post } from 'views/components/Post';
import { CreatePost } from 'views/components/CreatePost';

import { getPost } from 'api/post'

import { Post as PostType } from 'shared/types/Post'

const Main = (): JSX.Element => {
    const [post, setPost] = useState<PostType>({
        title: '',
        body: '',
    });

    useEffect(() => {
        getPost(1)
            .then((response: AxiosResponse) => {
                if (response.statusText === 'OK') {
                    setPost(response.data)
                }
            })
    }, []);

    return (
        <div>
            <CreatePost/>
            <Post
                data={post}
            />
        </div>
    );
};

export default Main;