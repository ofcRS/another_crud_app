import styled from 'styled-components';

const Layout = styled.div`
    display: flex;
    flex-wrap: wrap;

    background: #fff;

    > * {
        margin: 0 16px;
    }
`;

const MainArea = styled.main`
    width: 50vw;
`;

export const Styled = {
    Layout,
    MainArea,
};
