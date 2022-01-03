const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.APP_ENV === 'development';

const baseFilename = !isDev ? '[name]' : '[name].[contenthash]';

module.exports = {
  entry: {
    tailwind: "tailwindcss/tailwind.css",
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
  plugins: [new MiniCssExtractPlugin({ filename: path.join("..", 'css', `${baseFilename}.css`) })],
};
