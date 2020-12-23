import {
    ContentBlock,
    ContentState,
    DraftEntityType,
    DraftInlineStyleType,
    EditorState,
} from 'draft-js';
import { Dispatch, SetStateAction } from 'react';

export type Props = {
    name: string;
};

export type InlineStyleControl = {
    label: string;
    inlineStyle: DraftInlineStyleType;
};

export type BlockType =
    | 'header-one'
    | 'header-two'
    | 'header-three'
    | 'header-four'
    | 'header-five'
    | 'header-six';

export type BlockTypeControl = {
    label: string;
    type: BlockType;
};

export type EmbedType = 'image';

export type EmbedTypeControl = {
    label: string;
    type: EmbedType;
    icon?: string;
};

export type GetEntityStrategy = (
    type: DraftEntityType
) => (
    block: ContentBlock,
    callback: (start: number, end: number) => void,
    contentState: ContentState
) => void;

export type TokenProps = {
    offsetKey: string;
    entityKey: string;
};

export type LinkModalState = {
    callback: (url: string) => void;
    selectedUrl: string;
} | null;

export type TextEditorContext = {
    urlModalState: LinkModalState;
    setUrlModalState: Dispatch<SetStateAction<LinkModalState>>;
    editorState: EditorState;
};
