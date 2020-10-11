import React from 'react';

import { Props } from './Post.types';
import { Styled } from './Post.styles';
import {
    PostDocument,
    PostQuery,
    useDeletePostMutation,
} from 'graphql/generated';

export const Post: React.FC<Props> = ({ post }: Props) => {
    const [deletePost, { client }] = useDeletePostMutation();
    const onDelete = async () => {
        await deletePost({
            variables: {
                id: post.id,
            },
        });
        const current = client?.readQuery<PostQuery>({
            query: PostDocument,
        });
        if (current?.posts) {
            const updatedList = current.posts.filter(
                ({ id }) => id !== post.id
            );
            client?.writeQuery<PostQuery>({
                query: PostDocument,
                data: { posts: updatedList },
            });
        }
    };

    return (
        <Styled.Post>
            <Styled.MoreButton
                calloutItems={[
                    {
                        key: 'rm',
                        label: 'Remove post',
                        onClick: onDelete,
                    },
                ]}
            />
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </Styled.Post>
    );
};
