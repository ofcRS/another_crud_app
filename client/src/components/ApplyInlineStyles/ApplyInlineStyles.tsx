import React, { ReactNode, ReactNodeArray } from 'react';

import { Props, MappedStyles, WrapInStyle } from './ApplyInlineStyles.types';

const wrapInStyle: WrapInStyle = (styles, node) => {
    if (styles.length === 0) return node;
    const [currentStyle] = styles;
    let result: ReactNode = null;

    switch (currentStyle) {
        case 'BOLD':
            result = <b>{node}</b>;
            break;
        case 'ITALIC':
            result = <i>{node}</i>;
            break;
        default:
            break;
    }

    return wrapInStyle(styles.slice(1), result);
};

export const ApplyInlineStyles: React.FC<Props> = ({ children, styles }) => {
    const mappedStyles: MappedStyles[] = [];

    for (let i = 0; i <= styles.length - 1; i++) {
        const { style, length, offset } = styles[i];
        const next = styles[i + 1];
        if (i === 0) {
            mappedStyles.push({
                start: 0,
                end: offset,
            });
        }
        const currentEnd = length + offset;
        // если стайлинг пересекается выделяем пересекающиеся куски для того чтобы наложить на них оба стайла
        if (next && next.offset < currentEnd) {
            mappedStyles.push(
                {
                    start: offset,
                    end: next.offset - 1,
                    style: [style],
                },
                {
                    start: next.offset,
                    end: offset + length,
                    style: [style, next.style],
                }
            );
        }
        if (!next || currentEnd <= next.offset) {
            // mappedStyles.push({
            //     start: currentEnd,
            //     end: next?.offset,
            // });
            mappedStyles.push({
                start: offset,
                end: currentEnd,
                style: [style],
            });
        }
    }

    if (mappedStyles.length) {
        console.log(mappedStyles);
    }

    const styled: ReactNodeArray = mappedStyles.map(style => {
        let text: ReactNode = children.slice(style.start, style.end);
        if (!text) return null;

        if (style.style) {
            text = wrapInStyle(style.style, text);
        }

        return <span key={JSON.stringify(style)}>{text}</span>;
    });

    if (mappedStyles.length) {
        console.log(styled);
    }

    return <>{styled}</>;
};
