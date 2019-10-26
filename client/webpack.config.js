const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");


module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.ts',
    },
    optimization: {
        minimize: true,
    },
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Output Management"
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-typescript', '@babel/preset-env']
                    }
                },
            }
        ]
    },
    devServer: {
        contentBase: "./dist",
        hot: true,
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx'],
    },
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    }
};