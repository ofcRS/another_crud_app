export type LoginFormProps = {
    onSignIn: () => void;
};

export type RegistryFormProps = {
    onBackToLogin: () => void;
};

export enum AuthModalMode {
    login,
    registry,
}

export type AuthModalLocalStore = {
    mode: AuthModalMode;
};
