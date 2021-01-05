import React, { useEffect, useState } from 'react';
import { useRouteMatch, Redirect } from 'react-router';
import Editor from 'draft-js-plugins-editor';
import { EditorState, convertFromRaw, RawDraftContentState } from 'draft-js';
import createImagePlugin from 'draft-js-image-plugin';

import { usePostLazyQuery } from 'graphql/generated';

import { Styled } from './ViewPost.styles';
import { Props } from './ViewPost.types';

const imagePlugin = createImagePlugin();

export const ViewPost: React.FC<Props> = () => {
    const { params } = useRouteMatch<{ id: string }>();
    const [getPostInfo, { data, error }] = usePostLazyQuery();

    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createEmpty()
    );

    useEffect(() => {
        getPostInfo({
            variables: {
                id: parseInt(params.id),
            },
        });
    }, [getPostInfo, params.id]);

    useEffect(() => {
        if (data?.getPost?.body) {
            const { body } = data?.getPost;
            setEditorState(prev =>
                EditorState.set(prev, {
                    currentContent: convertFromRaw({
                        ...body,
                        entityMap: body.entityMap.reduce(
                            (res, cur, index) => ({
                                ...res,
                                [index]: cur,
                            }),
                            {}
                        ),
                    } as RawDraftContentState),
                })
            );
        }
    }, [data]);

    if (!params.id || Number.isNaN(parseInt(params.id))) {
        return <Redirect to="/posts" />;
    }

    return (
        <Styled.ViewPost>
            <h1>{data?.getPost?.title}</h1>
            <div>
                <Editor
                    readOnly={true}
                    onChange={() => {}}
                    editorState={editorState}
                    plugins={[imagePlugin]}
                />
            </div>
        </Styled.ViewPost>
    );
};
