import styled from 'styled-components';
import { ButtonStyles } from 'components/Button';
import { medium } from '../../styles/breakpoints';

const CreatePost = styled.div`
    display: flex;
    flex-wrap: wrap;

    position: relative;

    margin: 0 auto;
    padding: 16px;

    background: ${({ theme }) => theme.colors.dark};

    @media (min-width: ${medium}px) {
        width: 50vw;
    }
`;

const Title = styled.input`
    width: 100%;
    height: 48px;
    border: none;
    padding: 8px;
    margin-right: 8px;

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

const TitleWrapper = styled.div`
    display: flex;

    margin-bottom: 16px;
    width: 100%;
`;

const SubmitButton = styled(ButtonStyles.Button)`
    display: flex;
    justify-content: center;

    background: ${({ theme }) => theme.colors.active};

    width: 30%;
    border: 2px solid ${({ theme }) => theme.colors.neutral};

    font-size: 16px;
    text-align: center;
    font-weight: bolder;

    :focus,
    :active {
        outline: none;
        border-width: 3px;
    }
`;

export const Styled = {
    CreatePost,
    Title,
    SubmitButton,
    TitleWrapper,
};
