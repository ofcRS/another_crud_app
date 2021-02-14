import React from 'react';

import { User } from './User';

import { Props } from './Users.types';

import { useUsersQuery } from 'graphql/generated';

export const Users: React.FC<Props> = () => {
    const { data } = useUsersQuery();

    return (
        <div>
            {data?.users.map(user => (
                <User key={user.id} user={user} />
            ))}
        </div>
    );
};
