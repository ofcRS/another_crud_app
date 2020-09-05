import React from 'react';

import { Props } from './Post.types';
import { Styled } from './Post.styles';

const Post: React.FC<Props> = ({ data, refreshList }: Props) => {
    console.log(data);
    return (
        <Styled.Post>
            <Styled.MoreButton
                calloutItems={[
                    {
                        key: 'rm',
                        label: 'Remove post',
                    },
                ]}
            />
            <h3>{data.title}</h3>
            <p>{data.body}</p>
        </Styled.Post>
    );
};

export default Post;
