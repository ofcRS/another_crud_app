import React, { useContext } from 'react';
import { observer } from 'mobx-react';

import { PostMiniature } from 'components/PostMiniature';
import { PostPreview } from 'components/PostPreview';

import { Styled } from './Posts.styles';

import { postsContext } from './context';
import { ITEMS_ON_PAGE } from './FetchDataWrapper';

export const List: React.FC = observer(() => {
    const {
        selectedPost,
        skip,
        setSkip,
        postsPreviews,
        totalItems,
    } = useContext(postsContext);

    const showPostPreview = selectedPost !== null;

    const isMoreButtonVisible = skip + ITEMS_ON_PAGE < totalItems;

    return (
        <>
            <PostPreview show={showPostPreview} />
            <Styled.Posts showPostPreview={showPostPreview}>
                {postsPreviews.map(post => (
                    <PostMiniature key={post.id} post={post} />
                ))}
                {isMoreButtonVisible && (
                    <Styled.MoreButton
                        onClick={() => setSkip(prev => prev + ITEMS_ON_PAGE)}
                    >
                        Еще...
                    </Styled.MoreButton>
                )}
            </Styled.Posts>
        </>
    );
});
