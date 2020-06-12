const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
                chunks: 'all',
            },
        },
        entry: {
            app: path.join(__dirname, 'src/index.tsx'),
        },
        devtool: isProd ? false : 'inline-source-map',
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'caching',
                template: path.join(__dirname, 'public/index.html'),
            }),
            // new BundleAnalyzerPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        cacheCompression: isProd,
                        compact: isProd,
                    },
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
            ],
        },
        devServer: {
            contentBase: './dist',
            hot: true,
            writeToDisk: false,
            historyApiFallback: true,
            port: 3000,
        },
        resolve: {
            extensions: ['.ts', '.js', '.tsx'],
            plugins: [new TsconfigPathsPlugin({})],
        },
        output: {
            filename: isProd ? '[name].[contenthash].js' : '[name].[hash].js',
            publicPath: '/',
            path: path.resolve(__dirname, 'dist'),
        },
    });
};