import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    *, ::after, ::before {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
`;