import React from 'react';
import { observer, useLocalStore } from 'mobx-react';

import { Modal } from 'components/Modal';

import { LoginForm } from './LoginForm';
import { RegistryForm } from './RegistryForm';

import { Styled } from './AuthModal.styles';
import { AuthModalLocalStore, AuthModalMode } from './AuthModal.types';

import { useStore } from 'store';

export const ModalBody = observer(() => {
    const localStore = useLocalStore<AuthModalLocalStore>(() => ({
        mode: AuthModalMode.login,
    }));

    const title = localStore.mode === AuthModalMode.login ? 'Login' : 'Join';
    const form =
        localStore.mode === AuthModalMode.login ? (
            <LoginForm
                onSignIn={() => (localStore.mode = AuthModalMode.registry)}
            />
        ) : (
            <RegistryForm
                onBackToLogin={() => (localStore.mode = AuthModalMode.login)}
            />
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
