import React, {useEffect} from 'react';

import { Post } from 'views/components/Post';
import { CreatePost } from 'views/components/CreatePost';

import { getPost } from 'api/post'

const Main = (): JSX.Element => {
    useEffect(() => {
        getPost(1)
            .then(console.log)
    }, []);

    return (
        <div>
            <CreatePost/>
            <Post/>
        </div>
    );
};

export default Main;