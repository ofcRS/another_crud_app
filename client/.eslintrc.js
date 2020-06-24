module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
        'plugin:import/errors',
        'plugin:import/warnings',
    ],
    parserOptions: {
        ecmaVersion: 10,
        sourceType: 'module',
    },
    overrides: [
        {
            files: ['*.ts*'],
            plugins: ['react-hooks', 'prettier'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'off',
                'react-hooks/rules-of-hooks': ['error'],
                'react-hooks/exhaustive-deps': ['warn'],
                'prettier/prettier': ['error'],
                'react/prop-types': 'off',
                quotes: ['warn', 'single'],
                'import/no-unresolved': 'off'
            },
        },
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
};
