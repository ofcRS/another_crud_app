import React from 'react';
import { observer } from 'mobx-react';

import { Post } from './Post';
import { CreatePost } from './CreatePost';

import { useStore } from 'store';
import { usePostQuery } from 'graphql/generated';

export const List: React.FC = observer(() => {
    const { post } = useStore();

    usePostQuery({
        onCompleted: post.setItems,
    });

    return (
        <div>
            <CreatePost fetchPosts={() => null} />
            {post.items.map(post => (
                <Post refreshList={() => null} key={post.id} data={post} />
            ))}
        </div>
    );
});
