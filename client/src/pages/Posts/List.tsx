import React from 'react';
import { observer } from 'mobx-react';

import { Post } from './Post';
import { CreatePost } from './CreatePost';

import { usePostQuery } from 'graphql/generated';

export const List: React.FC = observer(() => {
    const { data } = usePostQuery();

    return (
        <div>
            <CreatePost fetchPosts={() => null} />
            {data?.posts.map(post => (
                <Post refreshList={() => null} key={post.id} data={post} />
            ))}
        </div>
    );
});
