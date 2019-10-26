const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    target: "node",
    optimization: {
        minimize: true,
    },
    module: {
        rules: [
            {
                test: /\.m?ts$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-typescript",
                                {
                                    isTSX: false,
                                }
                            ],
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        edge: "17",
                                        firefox: "60",
                                        chrome: "67",
                                        safari: "11.1",
                                    },
                                    useBuiltIns: "usage",
                                },
                            ],
                        ],
                        plugins: []
                    }
                }
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    }
};