import {
    InlineStyleControl,
    BlockTypeControl,
    EmbedTypeControl,
} from './TextEditor.types';

export const inlineStylesControls: InlineStyleControl[] = [
    {
        inlineStyle: 'BOLD',
        label: 'Bold',
    },
    {
        inlineStyle: 'ITALIC',
        label: 'Italic',
    },
];

export const blockTypeControls: BlockTypeControl[] = [
    {
        label: 'H1',
        type: 'header-one',
    },
    {
        label: 'H2',
        type: 'header-two',
    },
    {
        label: 'H3',
        type: 'header-three',
    },
];

export const embedTypeControls: EmbedTypeControl[] = [
    {
        label: '',
        type: 'image',
        icon: 'gallery',
    },
];
