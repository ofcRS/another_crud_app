import { CommonModalProps } from 'components/Modal';

export type Props = CommonModalProps & {
    onSubmit: (url: string) => void;
};
