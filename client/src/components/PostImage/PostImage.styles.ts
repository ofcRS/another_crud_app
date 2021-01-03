import styled from 'styled-components';

const ImageWrapper = styled.figure`
    max-width: 100%;
    display: flex;
    justify-content: center;

    img {
        //max-width: 50vw;
        width: 100%;
        object-fit: contain;
        max-height: 600px;
    }
`;

export const Styled = {
    ImageWrapper,
};
