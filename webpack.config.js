const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },

  target: 'web',

  resolve: {
    extensions: ['.js', '.ts'],
  },

  devServer: {
    static: path.join(__dirname, 'static'),
    open: false,
    port: 1234,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCss.loader, 'css-loader'],
      },
      {
        test: /\.(webp|png|jpe?g|svg|gif|ttf|woff|woff2|eot)$/,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new MiniCss({
      filename: '[name].css',
    }),
    new HTMLPlugin({
      filename: 'index.html',
      title: 'Messenger',
      template: 'static/template.html',
      hash: false,
      path: path.resolve(__dirname, 'dist'),
    }),
  ],
};
