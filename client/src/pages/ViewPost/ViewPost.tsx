import React, { useEffect, useState } from 'react';
import { useRouteMatch, Redirect } from 'react-router';
import { EditorState, convertFromRaw, RawDraftContentState } from 'draft-js';

import { TextEditor } from 'components/TextEditor';
import { usePostLazyQuery } from 'graphql/generated';

import { Styled } from './ViewPost.styles';
import { Props } from './ViewPost.types';

export const ViewPost: React.FC<Props> = () => {
    const { params } = useRouteMatch<{ id: string }>();
    const [getPostInfo, { data }] = usePostLazyQuery();

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
            const contentState = convertFromRaw({
                ...body,
                entityMap: body.entityMap.reduce(
                    (res, cur, index) => ({
                        ...res,
                        [index]: cur,
                    }),
                    {}
                ),
            } as RawDraftContentState);
            setEditorState(prev =>
                EditorState.set(
                    EditorState.push(prev, contentState, 'adjust-depth'),
                    {}
                )
            );
        }
    }, [data]);

    if (!params.id || Number.isNaN(parseInt(params.id))) {
        return <Redirect to="/posts" />;
    }

    return (
        <Styled.ViewPost>
            <Styled.PostHeader>{data?.getPost?.title}</Styled.PostHeader>
            <div>
                <TextEditor
                    setEditorState={setEditorState}
                    readOnly={true}
                    editorState={editorState}
                />
            </div>
        </Styled.ViewPost>
    );
};
