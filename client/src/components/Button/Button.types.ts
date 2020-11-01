import { HTMLAttributes } from 'react';
import { IconProps } from 'components/Icon';

export type Props = HTMLAttributes<HTMLButtonElement> & {
    iconProps?: IconProps;
};
