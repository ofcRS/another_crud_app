export type LoginFormProps = {
    onSignIn: () => void;
};

export type RegistryFormProps = {
    onBackToLogin: () => void;
};

export type AuthModalLocalStore = {
    mode: 'login' | 'registry';
};
