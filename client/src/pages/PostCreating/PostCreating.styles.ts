import styled from 'styled-components';

const CreatePost = styled.div`
    width: 50vw;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;

    background: ${({ theme }) => theme.colors.dark};
`;

const Title = styled.input`
    width: 100%;
    border: none;
    padding: 8px;
    height: 48px;
    margin-bottom: 8px;

    background: transparent;

    color: ${({ theme }) => theme.colors.neutral};
    font-size: 36px;
    font-weight: bold;

    position: relative;

    :active,
    :focus {
        outline: none;
        border-bottom: 1px solid ${({ theme }) => theme.colors.neutral};
    }
`;

export const Styled = {
    CreatePost,
    Title,
};
