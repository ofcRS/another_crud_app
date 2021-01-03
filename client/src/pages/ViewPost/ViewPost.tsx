import React from 'react';
import { useRouteMatch, Redirect } from 'react-router';

import { Props } from './ViewPost.types';
import { usePostQuery } from 'graphql/generated';

export const ViewPost: React.FC<Props> = () => {
    const { params } = useRouteMatch<{ id: string }>();
    const { data, error } = usePostQuery({
        variables: {
            id: parseInt(params.id),
        },
    });

    if (!params.id || Number.isNaN(parseInt(params.id)) || error) {
        return <Redirect to="/posts" />;
    }

    return (
        <div>
            <h1>{data?.getPost?.title}</h1>
        </div>
    );
};
