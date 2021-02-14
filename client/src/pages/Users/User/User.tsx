import React from 'react';

import { Styled } from './User.styles';
import { Props } from './User.types';

export const User: React.FC<Props> = ({ user }) => {
    return (
        <Styled.User>
            <b>{user.email}</b>
        </Styled.User>
    );
};
