const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {
    const mode = env.production ? 'production' : 'development';
    const isProd = mode === 'production';

    return ({
        mode,
        target: 'web',
        optimization: {
            minimize: isProd,
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all'
            }
        },
        entry: {
            app: './src/index.tsx',
        },
        devtool: 'inline-source-map',
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'caching',
                template: './public/index.html'
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                }
            ],
        },
        devServer: {
            contentBase: './dist',
            hot: true,
            writeToDisk: true,
            historyApiFallback: true,
        },
        resolve: {
            extensions: ['.ts', '.js', '.tsx'],
            alias: {
                root: __dirname,
                src: path.resolve(__dirname, 'src/')
            }
        },
        output: {
            filename: isProd ? '[name].[contenthash].js' : '[name].[hash].js',
            publicPath: '/',
            path: path.resolve(__dirname, 'dist'),
        }
    });
};