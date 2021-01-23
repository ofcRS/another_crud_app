import styled from 'styled-components';
import { medium } from 'styles/breakpoints';

const Layout = styled.div`
    display: flex;
    min-height: calc(100vh - ${({ theme }) => theme.layout.headerHeight}px);

    background: ${({ theme }) => theme.colors.baseBackground};
    color: ${({ theme }) => theme.colors.neutral};
`;

const MainArea = styled.main`
    position: relative;
    width: 100vw;
    margin: 0 auto;
    
    overflow-x: hidden;

    @media (min-width: ${medium}) {
        width: 70vw;
    }
`;

export const Styled = {
    Layout,
    MainArea,
};
