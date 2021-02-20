import { ButtonHTMLAttributes } from 'react';
import { IconProps } from 'components/Icon';

export enum ButtonVariant {
    submit = 'SUBMIT',
    text = 'TEXT',
}

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    iconProps?: IconProps;
    variant?: ButtonVariant;
};
