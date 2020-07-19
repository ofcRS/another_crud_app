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
                'unused-imports'
            ],
            rules: {
                '@typescript-eslint/no-var-requires': ['off'],
                'prettier/prettier': ['error'],
                '@typescript-eslint/explicit-function-return-type': ['off', {
                    allowExpressions: true,
                    allowTypedFunctionExpressions: true,
                    allowHigherOrderFunctions: true,
                }],
                'unused-imports/no-unused-imports-ts': 'warn',
                'unused-imports/no-unused-vars-ts': [
                    'warn',
                    {
                        vars: 'all',
                        varsIgnorePattern: '^_',
                        args: 'after-used',
                        argsIgnorePattern: '^_',
                    },
                ],
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 10,
        sourceType: 'module',
    },
}