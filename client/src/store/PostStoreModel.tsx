import React, { ReactNode } from 'react';
import { RawDraftContentState } from 'draft-js';
import { types } from 'mobx-state-tree';
import { PostModel, PostModelType } from 'models';
import { PostQuery, Post } from '../graphql/generated';
import { PostImage } from '../components/PostImage';

export const PostStoreModel = types
    .model({
        items: types.array(PostModel),
    })
    .actions(self => ({
        setItems: (response: PostQuery) => {
            return self.items.replace(response.posts as PostModelType[]);
        },
        getPreview: (post: Post): ReactNode => {
            const parsedBody: RawDraftContentState = JSON.parse(post.body);

            let previewImage: ReactNode = null;

            const atomicType = parsedBody.blocks.find(
                ({ type }) => type === 'atomic'
            );
            if (atomicType) {
                const [{ key }] = atomicType.entityRanges;
                const { src } = parsedBody.entityMap[key].data;
                previewImage = <PostImage src={src} />;
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
