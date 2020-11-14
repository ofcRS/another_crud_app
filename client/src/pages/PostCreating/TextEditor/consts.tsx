import { InlineStyleControl, BlockTypeControl } from './TextEditor.types';

export const inlineStylesControls: InlineStyleControl[] = [
    {
        inlineStyle: 'BOLD',
        label: 'Bold',
    },
    {
        inlineStyle: 'ITALIC',
        label: 'Italic',
    },
    { inlineStyle: 'CODE', label: 'Code' },
];

export const blockTypeControls: BlockTypeControl[] = [
    {
        label: 'h1',
        type: 'header-one',
    },
    {
        label: 'h2',
        type: 'header-two',
    },
    {
        label: 'h3',
        type: 'header-three',
    },
];
