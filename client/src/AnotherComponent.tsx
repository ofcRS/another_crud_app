import React, { useState } from 'react';
import _ from 'lodash';

const AnotherComponent = () => {
    const [count, setCount] = useState(10);

    return <div>
        Лол, ватафак?
        {count}
        { _.join([5,6,7,8], " ")}
        <button
            onClick={() => {
                setCount(count + 1);
            }}
        >
            Нажать
        </button>
    </div>;
};

export default AnotherComponent;