module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jasmine: true,
    jest: true,
    jquery: true,
    mocha: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  globals: {
    location: true,
  },
  rules: {},
};
