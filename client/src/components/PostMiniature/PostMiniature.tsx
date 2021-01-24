import React, { useContext } from 'react';

import { Props } from './PostMiniature.types';
import { Styled } from './PostMiniature.styles';
import { postsContext } from 'pages/Posts/context';

import { PostImage } from 'components/PostImage';

export const PostMiniature: React.FC<Props> = ({ post }: Props) => {
    const { onDeletePost, onSelectPost } = useContext(postsContext);
    // const [textPreview, imagePreview] = useMemo<
    //     readonly [ReactNodeArray, ReactNode]
    // >(() => {
    //     const { body } = post;
    //
    //     let previewImage: ReactNode = null;
    //
    //     const atomicType = body.blocks.find(({ type }) => type === 'atomic');
    //     if (atomicType) {
    //         const [{ key }] = atomicType.entityRanges;
    //         const { src } = body.entityMap[key].data;
    //         if (src) {
    //             previewImage = <PostImage src={src} />;
    //         }
    //     }
    //
    //     const resultParagraphs: ReactNodeArray = [];
    //     let totalCharactersInPreview = 0;
    //
    //     for (const { text, key } of body.blocks) {
    //         resultParagraphs.push(<p key={key}>{text}</p>);
    //         totalCharactersInPreview += text.length;
    //         if (totalCharactersInPreview >= 300) break;
    //     }
    //
    //     return [resultParagraphs, previewImage] as const;
    // }, [post]);

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
            <div
                onClick={() => onSelectPost(post)}
                style={{
                    width: '100%',
                }}
                // to={`/posts/${post.id}`}
                // onClick={() => history.push(`/posts/${post.id}`)}
            >
                <Styled.PostTitle>{post.title}</Styled.PostTitle>
                {post.imageSrc && <PostImage src={post.imageSrc} />}
                <Styled.TextPreview>{post.bodyPreview}</Styled.TextPreview>
            </div>
        </Styled.Post>
    );
};
