import React, { useEffect } from 'react';

import { deletePost } from 'api/post';

import { Props } from './Post.types';
import { Styled } from './Post.styles';

const Post: React.FC<Props> = ({ data, refreshList }: Props): JSX.Element => {
    const removePost = async (): Promise<void> => {
        await deletePost(data.id);
        refreshList();
    };

    return (
        <Styled.Post>
            <Styled.MoreButton
                calloutItems={[
                    {
                        key: 'rm',
                        label: 'Remove post',
                        onClick: removePost,
                    },
                ]}
            />
            <h3>{data.title}</h3>
            <p>{data.body}</p>
        </Styled.Post>
    );
};

export default Post;
