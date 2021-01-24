import React, { useContext } from 'react';
import { observer } from 'mobx-react';

import { PostMiniature } from 'components/PostMiniature';
import { PostPreview } from 'components/PostPreview';

import { usePostsPreviewsQuery } from 'graphql/generated';
import { Styled } from './Posts.styles';

import { postsContext } from './context';

export const List: React.FC = observer(() => {
    const { selectedPost } = useContext(postsContext);
    const { data } = usePostsPreviewsQuery();

    const showPostPreview = selectedPost !== null;

    return (
        <>
            <PostPreview show={showPostPreview} />
            <Styled.Posts showPostPreview={showPostPreview}>
                {data?.postsPreview.map(post => (
                    <PostMiniature key={post.id} post={post} />
                ))}
            </Styled.Posts>
        </>
    );
});
