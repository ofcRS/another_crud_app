const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = ({ production }) => {
    const { env } = process;

    console.log('IMPORTANT!!!');
    console.log({
        env: {
            production,
            API_PORT: env.API_PORT,
            API_HOST: env.API_HOST,
            test: 123,
        },
    });
    console.log('IMPORTANT!!!');

    const mode = production ? 'production' : 'development';
    const isProd = mode === 'production';

    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
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
            new webpack.DefinePlugin(envKeys),
            // new BundleAnalyzerPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
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
                {
                    test: /\.(woff|woff2)$/i,
                    use: 'url-loader?limit=100000',
                },
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: 'javascript/auto',
                },
            ],
        },
        devServer: {
            contentBase: './dist',
            hot: true,
            writeToDisk: false,
            historyApiFallback: true,
            port: 3000,
            host: '0.0.0.0',
        },
        resolve: {
            extensions: ['.ts', '.js', '.tsx', '.mjs'],
            plugins: [new TsconfigPathsPlugin({})],
        },
        output: {
            filename: isProd ? '[name].[contenthash].js' : '[name].[hash].js',
            publicPath: '/',
            path: path.resolve(__dirname, 'dist'),
        },
    };
};
