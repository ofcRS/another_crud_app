module.exports = {
    presets: [
        '@babel/preset-typescript',
        '@babel/preset-react',
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3,
            },
        ],
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-optional-chaining',
        [
            'babel-plugin-named-asset-import',
            {
                loaderMap: {
                    svg: {
                        ReactComponent: '@svgr/webpack?-svgo,+ref![path]',
                    },
                },
            },
        ],
    ],
};
