import React, { ReactNode, useMemo } from 'react';
import { useRouteMatch, Redirect } from 'react-router';
import { usePostQuery } from 'graphql/generated';

import { Styled } from './ViewPost.styles';
import { Props } from './ViewPost.types';
import { PostImage } from '../../components/PostImage';

export const ViewPost: React.FC<Props> = () => {
    const { params } = useRouteMatch<{ id: string }>();
    const { data, error } = usePostQuery({
        variables: {
            id: parseInt(params.id),
        },
    });

    const body = useMemo<ReactNode>(() => {
        const post = data?.getPost;
        if (post) {
            const {
                body: { blocks, entityMap },
            } = post;

            return blocks.map(({ key, text, type, entityRanges }) => {
                if (type === 'atomic') {
                    const [{ key }] = entityRanges;
                    const { src } = entityMap[key].data;
                    if (src) {
                        return <PostImage key={key} src={src} />;
                    }
                }
                return <p key={key}>{text}</p>;
            });
        }
        return null;
    }, [data?.getPost]);

    if (!params.id || Number.isNaN(parseInt(params.id)) || error) {
        return <Redirect to="/posts" />;
    }

    return (
        <Styled.ViewPost>
            <h1>{data?.getPost?.title}</h1>
            <div>{body}</div>
        </Styled.ViewPost>
    );
};
