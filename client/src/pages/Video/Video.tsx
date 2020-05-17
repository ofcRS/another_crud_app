import React, { useEffect, useState, useRef } from 'react';
import { Styled } from './Video.styles';
import { fillWithZeros } from 'utils/number';

const Video: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const [currentBg, setCurrentBg] = useState<string>('');

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const getUrls = async (): Promise<void> => {
            const res = [];
            for (let i = 0; i < 805; i++) {
                const number = fillWithZeros(i + 1);
                const url = await import(
                    `./assets/test_ff/image-0000${number}.jpg`
                );
                res.push(url.default);
            }
            console.log(res);
            setImages(res);
        };
        getUrls();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas && images.length) {
            const context = canvas.getContext('2d');
            let i = 0;
            const image = new Image();
            const interval = setInterval(() => {
                image.src = images[i];
                image.onload = () => {
                    context && context.drawImage(image, 0, 0);
                    i++;
                };
            }, 41.6);
            return () => clearInterval(interval);
        }
    }, [images]);
    return <Styled.Player width={480} height={480} ref={canvasRef} />;
};

export default Video;
