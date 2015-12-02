/* eslint-disable no-var */
var webpack = require('webpack');
var path = require('path');

module.exports = {
  output:  {
    libraryTarget: 'umd',
    library: 'BackTube'
  },
  devtool: 'inline-source-map',
  plugins: [
             new webpack.HotModuleReplacementPlugin(),
             new webpack.NoErrorsPlugin()
           ],
  module:  {
    loaders: [
      {test: /\.jsx?$/, loader: 'babel', include: path.join(__dirname, './src')}
    ]
  }
};
