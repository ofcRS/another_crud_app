import React, { useState } from 'react';

import { Icon } from 'components/Icon';

export const Users: React.FC = () => {
    const [show, setState] = useState(false);

    if (!show) return <button onClick={() => setState(true)}>показать</button>;

    return (
        <div>
            <Icon iconName={'more'} />
        </div>
    );
};
