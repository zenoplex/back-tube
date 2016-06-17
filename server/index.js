const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config');

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: { colors: true },
}));

app.use(webpackHotMiddleware(compiler));

const server = app.listen(3000, '0.0.0.0', err => {
  if (err) {
    console.log(err);
    return;
  }
  const { port } = server.address();
  console.log(`Listening at http://localhost:${port}`);
});
