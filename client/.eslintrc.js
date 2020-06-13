module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier'
    ],
    parserOptions: {
        ecmaVersion: 10,
        sourceType: 'module'
    },
    overrides: [
        {
            files: ['*.ts*'],
            plugins: [
                'react-hooks',
                'prettier'
            ],
            rules: {
                '@typescript-eslint/explicit-function-return-type': ['warn', {
                    allowExpressions: true,
                    allowTypedFunctionExpressions: true,
                    allowHigherOrderFunctions: true,
                }],
                'react-hooks/rules-of-hooks': ['error'],
                'react-hooks/exhaustive-deps': ['warn'],
                "prettier/prettier": ["error"],
                'react/prop-types': 'off',
                quotes: ['warn', 'single'],
            }
        }
    ],
    settings: {
        react: {
            version: 'detect',
        }
    },
};