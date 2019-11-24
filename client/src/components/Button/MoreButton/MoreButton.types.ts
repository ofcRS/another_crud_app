export type CalloutItem = {
    label: string;
    key: string | number;
    onClick?: () => void;
};

export type Props = {
    calloutItems: CalloutItem[];
};
