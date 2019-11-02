const path = require('path');

module.exports = env => {
    return ({
        entry: './src/index.ts',
        target: 'node',
        optimization: {
            minimize: true,
        },
        module: {
            rules: [
                {
                    test: /\.m?ts$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-typescript',
                                '@babel/preset-env'
                            ],
                        }
                    }
                },
            ]
        },
        resolve: {
            extensions: ['.ts']
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        }
    });
};