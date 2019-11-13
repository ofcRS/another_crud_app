const path = require('path');

const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = env => {
    const mode = env.production ? 'production' : 'development';

    return ({
        mode,
        entry: './src/server.ts',
        target: 'node',
        optimization: {
            minimize: false,
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                },
            ]
        },
        externals: [nodeExternals()],
        resolve: {
            extensions: ['.ts'],
            plugins: [new TsconfigPathsPlugin({})]
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        }
    });
};