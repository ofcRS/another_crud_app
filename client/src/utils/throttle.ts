export const throttle = (fn: (...args: any[]) => void, delay: number) => {
    let isActive = true;
    let savedArgs: any[] | null = null;
    return (...args: any[]) => {
        if (isActive) {
            fn(...args);
            isActive = false;
            savedArgs = null;
            setTimeout(() => {
                isActive = true;
                if (savedArgs) {
                    fn(...savedArgs);
                }
            }, delay);
        } else {
            savedArgs = args;
        }
    };
};
