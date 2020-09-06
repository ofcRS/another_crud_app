import React from 'react';
import { observer, useLocalStore } from 'mobx-react';

import { LoginForm } from './LoginForm';
import { RegistryForm } from './RegistryForm';

import { Styled } from './AuthModal.styles';
import { AuthModalLocalStore } from './AuthModal.types';
import { Modal } from 'components/Modal';

import { useStore } from '../../store';

const ModalBody = observer(() => {
    const localStore = useLocalStore<AuthModalLocalStore>(() => ({
        mode: 'login',
    }));

    const title = localStore.mode === 'login' ? 'Login' : 'Join';
    const form =
        localStore.mode === 'login' ? (
            <LoginForm onSignIn={() => (localStore.mode = 'registry')} />
        ) : (
            <RegistryForm onBackToLogin={() => (localStore.mode = 'login')} />
        );
    return (
        <Styled.FormWrapper>
            <Styled.Title>{title}</Styled.Title>
            {form}
        </Styled.FormWrapper>
    );
});

export const AuthModal = observer(() => {
    const { ui } = useStore();

    // выношу тело в отдельный компонент, чтобы он анмаунтился при закрытие модалки
    return (
        <Modal
            onClose={() => ui.toggleRegistryModal(false)}
            open={ui.registryModalOpen}
        >
            <ModalBody />
        </Modal>
    );
});
