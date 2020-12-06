import React from 'react';
import { useField } from 'formik';

import { Styled } from './TextField.styles';
import { Props } from './TextField.types';

export const TextField: React.FC<Props> = ({ name }) => {
    const [_, { value }, { setValue }] = useField(name);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <Styled.TextField>
            <input value={value} onChange={onChange} />
        </Styled.TextField>
    );
};
