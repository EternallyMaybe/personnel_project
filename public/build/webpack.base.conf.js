const path = require("path");
const paths = require("./paths");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(paths.PATH_SRC, "index.js")
    },
    output: {
        path: paths.PATH_DIST,
        filename: "[name].bundle.js",
        publicPath: "/"
    },
    resolve: {
        alias: {
            "@": paths.PATH_SRC,
            "components": path.resolve(paths.PATH_SRC, "components")
        },
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [
                                path.resolve(paths.PATH_SRC, 'assets/css')
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\??.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: "static/images/[name].[hash:7].[ext]" 
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: "static/videos/[name].[hash:7].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: "static/fonts/[name].[hash:7].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name]-[contenthash:7].css"
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(paths.PATH_ROOT, 'static'),
                to: path.resolve(paths.PATH_DIST, 'static'),
                ignore: ['.*'],
                cache: true
            }
        ])
    ]
}
