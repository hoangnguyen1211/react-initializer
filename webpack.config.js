const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const devServer = {
    port: 3000,
    open: true,
    historyApiFallback: true // enable router react
}

module.exports = {
    entry: {
        bundle: ['babel-polyfill', './src/index.js']
    },
    output: {
        path: path.join(__dirname, '/publish'),
        filename: '[name].[chunkhash].js',
        publicPath: '/',
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_module/,
                loader: 'babel-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },

                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.(png|jpg|gif|jpeg|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images',
                            publicPath: 'images'
                        }
                    }
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|wav|mp3|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts',
                            publicPath: 'fonts'
                        }
                    }
                ],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },

    optimization: {
        // Cache vendor
        splitChunks: {
            cacheGroups: {
                vendors: {
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    enforce: true
                },
            }
        },
        // File nao co su thay doi moi bundle lai
        runtimeChunk: {
            name: "manifest",
        },
        // minify inline css
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },

    plugins: [

        // parse template duoi khac thanh HTML
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        // Extract CSS ra khoi bundle thanh file rieng
        new MiniCssExtractPlugin({
            chunkFilename: "[name].[hash].css",
        })
    ],
    devServer
}