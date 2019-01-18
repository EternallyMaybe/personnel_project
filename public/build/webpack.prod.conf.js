const path = require("path");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const baseConfig = require("./webpack.base.conf");

module.exports = merge(baseConfig, {
    mode: "production",
    plugins: [
        new CleanWebpackPlugin(["dist"], {
            root: path.resolve(__dirname, "../")
        }),
    ],
    optimization: {
        minimize: true,
        noEmitOnErrors: true,
        splitChunks: {
           chunks: "all",
           minSize: 30000,
           minChunks: 1,
           maxAsyncRequests: 5,
           maxInitialRequests: 3,
           name: true,
           cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
           }
        },
        runtimeChunk: {
            name: "manifest"
        }
    }
});