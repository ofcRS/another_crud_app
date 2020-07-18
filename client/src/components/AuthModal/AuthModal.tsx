import React, { useEffect } from 'react';
import { observer, useLocalStore } from 'mobx-react';

import { Modal } from 'components';
import { LoginForm } from './LoginForm';
import { RegistryForm } from './RegistryForm';
import { useUIStore, useStore } from 'store';
import { Styled } from './AuthModal.styles';

export const AuthModal = observer(() => {
    const uiStore = useUIStore();
    const store = useStore();
    const localStore = useLocalStore<{ mode: 'login' | 'registry' }>(() => ({
        mode: 'login',
    }));

    useEffect(() => {
        if (!uiStore.registryModalOpen) {
            localStore.mode = 'login';
            store.loginError = null;
        }
    }, [localStore, store, uiStore.registryModalOpen]);

    const title = localStore.mode === 'login' ? 'Login' : 'Join';
    const form =
        localStore.mode === 'login' ? (
            <LoginForm onSignIn={() => (localStore.mode = 'registry')} />
        ) : (
            <RegistryForm onBackToLogin={() => (localStore.mode = 'login')} />
        );

    return (
        <Modal
            onClose={() => uiStore.toggleRegistryModal(false)}
            open={uiStore.registryModalOpen}
        >
            <Styled.FormWrapper>
                <Styled.Title>{title}</Styled.Title>
                {form}
            </Styled.FormWrapper>
        </Modal>
    );
});
