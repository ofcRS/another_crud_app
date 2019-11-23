module.exports = {
    presets: [
        '@babel/preset-typescript',
        '@babel/preset-react',
        ['@babel/preset-env', {
            'useBuiltIns': false
        }],
    ],
    plugins: [
        "@babel/plugin-transform-runtime"
    ]
};