const commonPaths = require("./common-paths");
const webpack = require("webpack");

const port = process.env.PORT || 8080;

const config = {
  mode: "development",
  entry: {
    app: `${commonPaths.appEntry}/index.js`,
  },
  output: {
    filename: "[name].[hash].js",
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('node-sass')
            }
          }
        ],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    host: "localhost",
    port: port,
    historyApiFallback: true,
    hot: true,
  },
};

module.exports = config;
