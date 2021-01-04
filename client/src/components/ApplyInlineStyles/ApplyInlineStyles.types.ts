import { DraftInlineStyleType, RawDraftInlineStyleRange } from 'draft-js';
import { ReactNode } from 'react';

export type MappedStyles = {
    style?: DraftInlineStyleType[];
    end?: number;
    start: number;
};

export type Props = {
    styles: RawDraftInlineStyleRange[];
    children: string;
};

/**
 * рекурсивно применяем массив стилий к тексту
 * */
export type WrapInStyle = (
    styles: DraftInlineStyleType[],
    node: ReactNode
) => ReactNode;
