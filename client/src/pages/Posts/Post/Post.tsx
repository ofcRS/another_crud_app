import React, { useContext } from 'react';

import { Props } from './Post.types';
import { Styled } from './Post.styles';
import { postsContext } from '../context';

export const Post: React.FC<Props> = ({ post }: Props) => {
    const { onDeletePost } = useContext(postsContext);

    return (
        <Styled.Post>
            <Styled.MoreButton
                calloutItems={[
                    {
                        key: 'rm',
                        label: 'Remove post',
                        onClick: () => onDeletePost(post.id),
                    },
                ]}
            />
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </Styled.Post>
    );
};
