import styled from 'styled-components';

const CreatePost = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

const Title = styled.input`
    width: 100%;
    background: transparent;
    color: ${({ theme }) => theme.colors.neutral};
    border: 1px solid ${({ theme }) => theme.colors.neutral};
`;

export const Styled = {
    CreatePost,
    Title,
};
