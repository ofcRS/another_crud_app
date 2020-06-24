import React from 'react';

export type Props = {
    target: HTMLElement | null;
    onDismiss: () => void;
} & React.HTMLAttributes<HTMLElement> &
    StyledCalloutProps;

export type Position = {
    x: number;
    y: number;
};

export type StyledCalloutProps = {
    show: boolean;
};
