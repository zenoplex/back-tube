/* eslint-disable no-var */
var webpack = require('webpack');
var path = require('path');

module.exports = {
  output:  {
    libraryTarget: 'umd',
    library: 'BackTube'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {'NODE_ENV': JSON.stringify('production')}
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true,
        warnings:     false
      }
    })
  ],
  module:  {
    loaders: [
      {test: /\.jsx?$/, loader: 'babel', include: path.join(__dirname, './src')}
    ]
  }
};
