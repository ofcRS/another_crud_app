import React from 'react';

import { Modal } from 'components/Modal';

import { Styled } from './LinkModal.styles';
import { Props } from './LinkModal.types';

const LinkModalBody: React.FC<Props> = () => {
    return (
        <Styled.LinkModalBody>
            <input />
        </Styled.LinkModalBody>
    );
};

export const LinkModal: React.FC<Props> = props => {
    return (
        <Modal {...props}>
            <LinkModalBody {...props} />
        </Modal>
    );
};
