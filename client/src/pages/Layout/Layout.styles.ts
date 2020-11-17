import styled from 'styled-components';

const Layout = styled.div`
    display: flex;
    min-height: calc(100vh - ${({ theme }) => theme.layout.headerHeight}px);

    background: ${({ theme }) => theme.colors.baseBackground};
    color: ${({ theme }) => theme.colors.neutral};
`;

const MainArea = styled.main`
    width: 70vw;
    margin: 0 auto;
`;

export const Styled = {
    Layout,
    MainArea,
};
