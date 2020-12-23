import { createContext } from 'react';
import { EditorState } from 'draft-js';

import { TextEditorContext } from './TextEditor.types';

export const textEditorContext = createContext<TextEditorContext>({
    urlModalState: null,
    setUrlModalState: () => null,
    editorState: EditorState.createEmpty(),
});
