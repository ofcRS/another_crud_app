import { createGlobalStyle } from 'styled-components';
import Roboto from 'assets/fonts/Roboto.woff2';

export const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: "Roboto";
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url(${Roboto});
    }
    *, ::after, ::before {
        font-family: 'Roboto', sans-serif;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
`;
