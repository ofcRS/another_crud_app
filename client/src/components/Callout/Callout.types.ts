import React from 'react';

export type Props = {
    target: HTMLElement | null;
    onDismiss: () => void;
} & React.HTMLAttributes<HTMLElement>;

export type Position = {
    x: number;
    y: number;
};
