/* eslint-disable no-var */
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry:   {
    index: ['./src/index.js']
  },
  output:  {
    path:     path.join(__dirname, './dist/'),
    filename: '[name].bundle.js',
    libraryTarget: 'umd'
  },
  devtool: 'inline-source-map',
  plugins: [
             new webpack.HotModuleReplacementPlugin(),
             new webpack.NoErrorsPlugin()
           ],
  module:  {
    loaders: [
      {test: /\.jsx?$/, loader: 'babel', include: path.join(__dirname, './src/js')}
    ]
  }
};
