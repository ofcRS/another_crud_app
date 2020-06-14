import React from 'react';
import { observer } from 'mobx-react';

import { Modal } from 'components';
import { LoginForm } from './LoginForm';
import { RegistryForm } from './RegistryForm';
import { useUIStore } from 'store/uiStore';

export const AuthModal = observer(() => {
    const uiStore = useUIStore();

    return (
        <Modal
            onClose={uiStore.toggleRegistryModal}
            open={uiStore.registryModalOpen}
        >
            <LoginForm />
            <RegistryForm />
        </Modal>
    );
});
