import {
    ContentBlock,
    ContentState,
    DraftEntityType,
    EditorProps,
    EditorState,
} from 'draft-js';
import { Dispatch, SetStateAction } from 'react';

export type Props = Partial<EditorProps> & {
    editorState: EditorState;
    setEditorState: (editorState: EditorState) => void;
    urlModalState?: LinkModalState;
    setUrlModalState?: Dispatch<SetStateAction<LinkModalState>>;
};

export type LinkModalState = {
    callback: (url: string) => void;
    selectedUrl: string;
} | null;

export type TextEditorContext = {
    urlModalState?: LinkModalState;
    setUrlModalState?: Dispatch<SetStateAction<LinkModalState>>;
    editorState: EditorState;
};

export type GetEntityStrategy = (
    type: DraftEntityType
) => (
    block: ContentBlock,
    callback: (start: number, end: number) => void,
    contentState: ContentState
) => void;
