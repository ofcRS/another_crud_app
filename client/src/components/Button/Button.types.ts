import { HTMLAttributes } from 'react';
import { IconProps } from 'components/Icon';

export enum ButtonVariant {
    submit = 'SUBMIT',
}

export type Props = HTMLAttributes<HTMLButtonElement> & {
    iconProps?: IconProps;
    variant?: ButtonVariant;
};
