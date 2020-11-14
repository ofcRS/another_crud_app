import {
    ContentBlock,
    ContentState,
    DraftEntityMutability,
    DraftInlineStyleType,
} from 'draft-js';

export type Props = {};

export type InlineStyleControl = {
    label: string;
    inlineStyle: DraftInlineStyleType;
};

type BlockType =
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

export type GetEntityStrategy = (
    mutabily: DraftEntityMutability
) => (
    block: ContentBlock,
    callback: (start: number, end: number) => void,
    contentState: ContentState
) => void;

export type TokenProps = {
    offsetKey: string;
};
