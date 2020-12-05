import { useState } from 'react';

export const useBoolean = () => {
    const [value, setValue] = useState(false);

    const toggleValue = () => setValue(prev => !prev);

    return [value, toggleValue] as const;
};
