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
        currentPage,
        setCurrentPage,
        postsPreviews,
        totalItems,
    } = useContext(postsContext);

    const showPostPreview = selectedPost !== null;

    return (
        <>
            <PostPreview show={showPostPreview} />
            <Styled.Posts showPostPreview={showPostPreview}>
                {postsPreviews.map(post => (
                    <PostMiniature key={post.id} post={post} />
                ))}
                {!((currentPage - 1) * ITEMS_ON_PAGE >= totalItems) && (
                    <Styled.MoreButton
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Еще...
                    </Styled.MoreButton>
                )}
            </Styled.Posts>
        </>
    );
});
