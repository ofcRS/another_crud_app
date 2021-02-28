import React, { useContext } from 'react';

import { PostTitle } from 'components/PostTitle';
import { TextEditor } from 'components/TextEditor';

import { PostComments } from './PostComments';
import { NewComment } from './NewComment';

import { Styled } from './ViewPost.styles';
import { Props } from './ViewPost.types';
import { viewPostContext } from './context';

export const ViewPost: React.FC<Props> = () => {
    const {
        post,
        editorState,
        setEditorState,
        onLeaveComment,
        commentsTree,
    } = useContext(viewPostContext);

    return (
        <Styled.ViewPostWrapper>
            <Styled.ViewPost>
                <PostTitle>{post?.title}</PostTitle>
                <Styled.EditorWrapper>
                    <TextEditor
                        setEditorState={setEditorState}
                        readOnly={true}
                        editorState={editorState}
                    />
                </Styled.EditorWrapper>
                <h2>Comments - {post?.comments.length}</h2>
                <NewComment
                    onLeaveComment={text => onLeaveComment(text, null)}
                />
                <PostComments commentsTree={commentsTree} />
            </Styled.ViewPost>
        </Styled.ViewPostWrapper>
    );
};
