import { useEffect } from 'react';

const { rootStore } = jest.requireActual('store');

export const useStore = () => {
    useEffect(() => {
        rootStore.ui.toggleRegistryModal(true);
    }, []);
    return rootStore;
};
