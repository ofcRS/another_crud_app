import React from 'react';
import { useField } from 'formik';

import { ErrorMessage } from 'components/FormError';

import { Props } from './TextArea.types';

export const TextArea: React.FC<Props> = ({ name, ...props }) => {
    const [_, { value, error }, { setValue, setTouched }] = useField(name);

    return (
        <div>
            <textarea
                {...props}
                value={value}
                onChange={({ target: { value } }) => setValue(value)}
                onBlur={() => setTouched(true)}
            />
            {props.showError && <ErrorMessage>{error}</ErrorMessage>}
        </div>
    );
};
