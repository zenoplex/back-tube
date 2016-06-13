const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  entry:   {
    app: [
      './src/index',
    ]
  },
  output:  {
    path:          './dist',
    filename:      '[name].bundle.js',
    libraryTarget: 'umd',
    library:       'BackTube'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify('production') }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true,
        warnings:     false
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject:   'head',
    }),
    new TransferWebpackPlugin([{
      from: 'assets',
      to: 'css',
    }]),
  ],
  module:  {
    loaders: [
      { test: /\.js$/, loader: 'babel', include: path.resolve(__dirname, './src') }
    ]
  },
  resolve: {
    root:       [path.resolve(__dirname, './src')],
    extensions: ['', '.js'],
  },
};
