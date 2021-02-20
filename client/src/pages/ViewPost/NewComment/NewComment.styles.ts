import styled from 'styled-components';

const NewComment = styled.div`
    display: flex;
    flex-wrap: wrap;

    width: 100%;
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.colors.neutral};

    margin-bottom: 16px;

    > :first-child {
        width: 100%;
    }

    textarea {
        width: 100%;
        min-height: 80px;
        padding: 4px;
        resize: none;
        margin-bottom: 8px;
        background: none;
        color: ${({ theme }) => theme.colors.neutral};
        font-size: 16px;
        border: none;

        :active,
        :focus {
            outline: none;
        }

        ::placeholder {
            color: ${({ theme }) => theme.colors.neutral};
        }
    }

    button {
        margin-left: auto;
    }
`;

export const Styled = {
    NewComment,
};
