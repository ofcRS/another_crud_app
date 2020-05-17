export const fillWithZeros = (n: number): string => {
    if (n < 10) {
        return `00${n}`;
    } else if (n < 100) {
        return `0${n}`;
    } else {
        return n.toString();
    }
};
