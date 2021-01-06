import React from 'react';
import Editor from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import { CompositeDecorator, EditorState } from 'draft-js';

import { getEntityStrategy } from './helpers';
import { Link } from './Link';

import { Props } from './TextEditor.types';
import { textEditorContext } from './context';

import { useEffectOnce } from 'hooks/useEffectOnce';

const imagePlugin = createImagePlugin();

export const TextEditor: React.FC<Props> = ({
    editorState,
    setEditorState,
    setUrlModalState,
    urlModalState,
    ...props
}) => {
    useEffectOnce(() => {
        const decorator = new CompositeDecorator([
            {
                component: Link,
                strategy: getEntityStrategy('LINK'),
                props: {
                    readonly: props.readOnly,
                },
            },
        ]);
        setEditorState(EditorState.set(editorState, { decorator }));
    });

    return (
        <textEditorContext.Provider
            value={{
                editorState,
                setUrlModalState,
                urlModalState,
            }}
        >
            <Editor
                {...props}
                onChange={setEditorState}
                editorState={editorState}
                plugins={[imagePlugin]}
            />
        </textEditorContext.Provider>
    );
};
