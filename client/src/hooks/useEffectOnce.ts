import { useState, useEffect } from 'react';

export const useEffectOnce = (effect: (...args: unknown[]) => void) => {
    const [fired, setFired] = useState(false);
    useEffect(() => {
        if (!fired) {
            effect();
        }
        setFired(true);
    }, [fired]);
};
