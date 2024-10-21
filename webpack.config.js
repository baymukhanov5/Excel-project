const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    const isProd = env.mode === 'production';
    const isDev = !isProd;

    return {
        context: path.resolve(__dirname, './src'),
        mode: 'development',
        entry: './index.js',
        output: {
            filename: 'bundle.[hash].js',
            path: path.resolve(__dirname, './dist'),
        },
        resolve: {
            extensions: ['.js'],
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@core': path.resolve(__dirname, './src/core'),
            }
        },
        devServer: {
            port: 5000,
            open: true,
            hot: true
        },
        devtool: isDev ? 'source-map' : false,
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './index.html',
                minify: {
                    removeComments: isProd,
                    collapseWhitespace: isProd,
                },
            }),
            new MiniCssExtractPlugin({
                filename: 'bundle.[hash].css',
            })
        ],
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ],
        },
    }
}