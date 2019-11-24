module.exports = {
    presets: [
        '@babel/preset-typescript',
        '@babel/preset-react',
        [
            '@babel/preset-env',
            {
                useBuiltIns: false,
            },
        ],
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
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
