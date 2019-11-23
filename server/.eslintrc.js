module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier'
    ],
    overrides: [
        {
            files: ['src/**/*.ts'],
            rules: {
                "@typescript-eslint/no-var-requires": ["off"],
                "prettier/prettier": ["error"],
            }
        }
    ],
    parserOptions:  {
        ecmaVersion: 10,
        sourceType: "module"
    }
};