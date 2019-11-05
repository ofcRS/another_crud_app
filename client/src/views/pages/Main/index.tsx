import React from 'react';

import {Post} from 'views/components/Post';
import { CreatePost } from 'views/components/CreatePost';

const Main = () => {
    return (
        <div>
            <CreatePost />
            <Post />
        </div>
    );
};

export default Main;