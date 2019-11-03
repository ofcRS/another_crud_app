import React, { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';

const AnotherComponent = (): JSX.Element => {
    const [count, setCount] = useState(10);
    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(res => {
                console.log(res)
            })
    }, []);

    return <div>
        Лол, ватафак?
        {count}
        {_.join([5, 6, 7, 8], ' ')}
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