import React, { ReactNode } from 'react';

import { types } from 'mobx-state-tree';
import { PostModel } from 'models';
import { Post } from '../graphql/generated';
import { PostImage } from 'components/PostImage';

export const PostStoreModel = types
    .model({
        items: types.array(PostModel),
    })
    .actions(self => ({
        getPreview: (post: Post): ReactNode => {
            const parsedBody = post.body;

            let previewImage: ReactNode = null;

            const atomicType = parsedBody.blocks.find(
                ({ type }) => type === 'atomic'
            );
            if (atomicType) {
                const [{ key }] = atomicType.entityRanges;
                const { src } = parsedBody.entityMap[key].data;
                if (src) {
                    previewImage = <PostImage src={src} />;
                }
            }

            return (
                <>
                    {previewImage}
                    {parsedBody.blocks.map(({ text, key }) => (
                        <p key={key}>{text}</p>
                    ))}
                </>
            );
        },
    }));
