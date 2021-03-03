import styled, { keyframes } from 'styled-components';
import { Theme } from 'styles/theme';
import { smoothTiming } from 'consts/animation';

const PostComments = styled.div`
    position: relative;
    padding-left: 9px;
`;

const CommentsBranchIndicator = styled.div`
    height: 100%;
    width: 2px;

    background: ${({ theme }) => theme.colors.primaryColor};
`;

const CommentsBranchIndicatorWrapper = styled.div`
    display: flex;
    justify-content: center;

    position: absolute;
    left: -4px;
    top: 0;
    height: 100%;

    width: 10px;

    cursor: pointer;

    :hover {
        > ${CommentsBranchIndicator} {
            background: ${({ theme }) => theme.colors.actionBrighter};
        }
    }
`;

const highlightOnRender = (theme: Theme) => keyframes`
    50% {
        background: ${theme.colors.actionBrighter};
    }
`;

const Comment = styled.div<{ highlighted?: boolean }>`
    animation-name: ${({ theme }) => highlightOnRender(theme)};
    ${({ highlighted }) => {
        if (highlighted) {
            return `
                    animation-duration: 1s;
                    animation-timing-function: ${smoothTiming};`;
        }
    }};

    > button {
        margin-bottom: 4px;
        padding: 0;
        color: ${({ theme }) => theme.colors.secondaryColor};
        border-color: ${({ theme }) => theme.colors.secondaryColor};
        text-decoration-style: dotted;

        :last-of-type:not(:only-of-type) {
            color: ${({ theme }) => theme.colors.neutral};
            border-color: ${({ theme }) => theme.colors.neutral};
        }
    }

    i {
        color: ${({ theme }) => theme.colors.secondaryColor};
    }
`;

export const Styled = {
    Comment,
    PostComments,
    CommentsBranchIndicator,
    CommentsBranchIndicatorWrapper,
};
