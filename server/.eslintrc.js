module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    overrides: [
        {
            files: ['src/**/*.ts'],
            plugins: [
                'prettier',
            ],
            rules: {
                '@typescript-eslint/no-var-requires': ['off'],
                'prettier/prettier': ['error'],
                '@typescript-eslint/explicit-function-return-type': ['off', {
                    allowExpressions: true,
                    allowTypedFunctionExpressions: true,
                    allowHigherOrderFunctions: true,
                }],
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 10,
        sourceType: 'module',
    },
}