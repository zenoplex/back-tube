const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './src/index',
    ],
  },
  output: {
    path: '/',
    filename: '[name].bundle.js',
    libraryTarget: 'umd',
    library: 'BackTube',
  },
  devtool: 'cheap-module-inline-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'head',
    }),
    new TransferWebpackPlugin([{
      from: 'assets',
      to: 'css',
    }]),
  ],
  module: {
    loaders: [
      { test: /\.js/, loader: 'babel', include: path.resolve(__dirname, './src') },
    ],
  },
  resolve: {
    root: [path.resolve(__dirname, './src')],
    extensions: ['', '.js'],
  },
};
