module.exports = {
    presets: [
        '@babel/preset-typescript',
        '@babel/preset-react',
        '@babel/preset-env',
    ],
    plugins: [
        ["module-resolver", {
            "root": ["."],
            "alias": {
                "src": "./src/",
            }
        }]
    ]
};