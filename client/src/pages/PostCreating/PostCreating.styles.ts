import styled from 'styled-components';

const CreatePost = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    height: 100vh;
`;

const Title = styled.input`
    width: 100%;
    background: transparent;
`;

const Body = styled.textarea`
    width: 100%;
    resize: none;
    background: transparent;

    color: ${({ theme }) => theme.colors.neutral};

    text-align: center;
    height: 100%;
`;

export const Styled = {
    CreatePost,
    Title,
    Body,
};
