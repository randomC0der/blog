const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

const isDev = process.env.APP_ENV === 'development';

const baseFilename = !isDev ? '[name]' : '[name].[contenthash]';

module.exports = {
  entry: {
    normalize: "normalize.css",
  },
  output: {
    path: path.resolve(__dirname, "_site", "assets", "js"),
    filename: `${baseFilename}.js`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new RemoveEmptyScriptsPlugin({ verbose: isDev, enabled: !isDev }),
    new MiniCssExtractPlugin({ filename: path.join("..", 'css', `${baseFilename}.css`) }),
  ],
};
