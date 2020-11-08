import React, { useCallback, useState } from 'react';
import { EditorState, Editor, DraftHandleValue, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

import { Props } from './TextEditor.types';

export const TextEditor: React.FC<Props> = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const handleKeyCommand = useCallback(
        (command: string, editorState: EditorState): DraftHandleValue => {
            const newState = RichUtils.handleKeyCommand(editorState, command);

            if (newState) {
                setEditorState(newState);
                return 'handled';
            }

            return 'not-handled';
        },
        []
    );

    return (
        <Editor
            tabIndex={2}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={setEditorState}
        />
    );
};
