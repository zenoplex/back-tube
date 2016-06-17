module.exports = {
  parser:  'babel-eslint',
  extends: 'airbnb-base',
  env:     {
    browser: true,
    mocha: true,
  },
  rules:   {
    'no-console':  0,
    'no-underscore-dangle': 0,
  }
};
