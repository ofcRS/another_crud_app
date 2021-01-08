import React, { ReactNode, ReactNodeArray, useContext, useMemo } from 'react';

import { Props } from './PostPreview.types';
import { Styled } from './PostPreview.styles';
import { postsContext } from 'pages/Posts/context';

import { PostImage } from 'components/PostImage';

import { Link } from 'react-router-dom';

export const PostPreview: React.FC<Props> = ({ post }: Props) => {
    const { onDeletePost } = useContext(postsContext);
    const [textPreview, imagePreview] = useMemo<
        readonly [ReactNodeArray, ReactNode]
    >(() => {
        const { body } = post;

        let previewImage: ReactNode = null;

        const atomicType = body.blocks.find(({ type }) => type === 'atomic');
        if (atomicType) {
            const [{ key }] = atomicType.entityRanges;
            const { src } = body.entityMap[key].data;
            if (src) {
                previewImage = <PostImage src={src} />;
            }
        }

        const resultParagraphs: ReactNodeArray = [];
        let totalCharactersInPreview = 0;

        for (const { text, key } of body.blocks) {
            resultParagraphs.push(<p key={key}>{text}</p>);
            totalCharactersInPreview += text.length;
            if (totalCharactersInPreview >= 300) break;
        }

        return [resultParagraphs, previewImage] as const;
    }, [post]);

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
            <Link
                to={`/posts/${post.id}`}
                // onClick={() => history.push(`/posts/${post.id}`)}
            >
                <Styled.PostTitle>{post.title}</Styled.PostTitle>
                {imagePreview}
                <Styled.TextPreview>{textPreview}</Styled.TextPreview>
            </Link>
        </Styled.Post>
    );
};
