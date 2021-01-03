import styled from 'styled-components';
import { medium } from 'styles/breakpoints';

const Posts = styled.div`
    width: 100%;
    padding-top: 32px;
    margin: 0 auto;

    @media (min-width: ${medium}) {
        width: 50vw;
    }
`;

export const Styled = {
    Posts,
};
