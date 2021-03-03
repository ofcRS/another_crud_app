import styled from 'styled-components';

const FormWrapper = styled.div`
    padding: 16px;
`;

const InputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 16px;
`;

const Label = styled.label`
    margin-right: 8px;
`;

const Title = styled.h2`
    width: 100%;
    padding-bottom: 16px;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    > :first-child {
        margin-right: 8px;
    }
`;

export const Styled = {
    FormWrapper,
    InputWrapper,
    Label,
    Title,
    ButtonsWrapper,
};
