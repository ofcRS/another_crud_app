import React from 'react';
import { observer } from 'mobx-react';

import { Post } from './Post';
import { CreatePost } from './CreatePost';

import { useQuery } from 'models';

const ListBody = observer(() => {
    const { data } = useQuery(store => store.queryPosts());

    return (
        <div>
            <CreatePost fetchPosts={() => null} />
            {data?.posts.map(post => (
                <Post refreshList={() => null} key={post.id} data={post} />
            ))}
        </div>
    );
});

export const List: React.FC = () => {
    return <ListBody />;
};
