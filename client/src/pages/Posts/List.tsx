import React from 'react';
import { observer } from 'mobx-react';

import { PostPreview } from '../../components/PostPreview';

import { usePostsQuery } from 'graphql/generated';
import { Styled } from './Posts.styles';

export const List: React.FC = observer(() => {
    const { data, error } = usePostsQuery();

    return (
        <Styled.Posts>
            {data?.posts.map(post => (
                <PostPreview key={post.id} post={post} />
            ))}
        </Styled.Posts>
    );
});
