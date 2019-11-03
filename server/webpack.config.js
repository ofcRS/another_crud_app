const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');

const nodeModules = {};

fs.readdirSync('node_modules')
    .filter(module => !module.includes('.bin'))
    .forEach(module => nodeModules[module] = 'commonjs ' + module);


module.exports = env => {
    const mode = env.production ? 'production' : 'development';

    return ({
        mode,
        entry: './src/index.ts',
        target: 'node',
        optimization: {
            minimize: false,
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'babel-loader',
                },
            ]
        },
        externals: [nodeExternals()],
        resolve: {
            extensions: ['.ts']
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        }
    });
};