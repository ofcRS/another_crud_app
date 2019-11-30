import styled from 'styled-components';

import { MoreButton } from 'components/Button/MoreButton';

export const Styled = {
    Post: styled.section`
        position: relative;
        width: max-content;
        min-width: 250px;
        max-width: 450px;
        min-height: 80px;
        border: 1px solid #f4f4f4;

        p {
            white-space: pre-line;
        }
    `,
    MoreButton: styled(MoreButton)`
        position: absolute;
        right: 5px;
        top: 5px;
    `,
};
