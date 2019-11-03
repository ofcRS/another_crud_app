module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended'
    ],
    overrides: [
        {
            files: ['src/**/*.ts'],
            rules: {
                "@typescript-eslint/no-var-requires": ["off"]
            }
        }
    ],
    parserOptions:  {
        ecmaVersion: 10,
        sourceType: "module"
    }
};