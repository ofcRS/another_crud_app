import styled from 'styled-components';

export const Styled = {
    Button: styled.button`
        cursor: pointer;
    `,
};

export const One = styled.button`
    text-align: center;
`;

export const Two = styled(One)``;
