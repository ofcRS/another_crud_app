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
    overrides: [
        {
            "files": ["*.ts", "*.tsx"],
            "rules": {
                "@typescript-eslint/explicit-function-return-type": ["warn", {
                    allowExpressions: true,
                    allowTypedFunctionExpressions: true,
                    allowHigherOrderFunctions: true,
                }]
            }
        }
    ],
    settings: {
        react: {
            version: 'detect',
        }
    }
};