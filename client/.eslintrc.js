module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
        ecmaVersion: 10,
        sourceType: "module"
    },
    rules: {
        "semi": ["error", "always"],
        "quotes": ["error", "single"],
    },
    settings: {
        react: {
            version: 'detect',
        }
    }
};