module.exports = {
  parser:  'babel-eslint',
  extends: 'airbnb-base',
  plugins: [
    'flow-vars',
  ],
  env:     {
    browser: true,
    mocha: true,
  },
  rules:   {
    'no-console':  0,
    'no-underscore-dangle': 0,
    'flow-vars/define-flow-type': 1,
    'flow-vars/use-flow-type': 1,
  },
  settings: {
    'import/resolver': 'webpack',
  }
};
