import styled from 'styled-components';

import { MoreButton } from 'components';

export const Styled = {
    Post: styled.section`
        position: relative;
        width: 100%;
        min-width: 250px;
        min-height: 80px;
        border: 1px solid #f4f4f4;

        p {
            white-space: pre-line;
        }

        :not(:last-child) {
            margin-bottom: 32px;
        }
    `,
    MoreButton: styled(MoreButton)`
        position: absolute;
        right: 5px;
        top: 5px;
    `,
};
