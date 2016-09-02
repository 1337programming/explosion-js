var config = module.exports = {};
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackBrowserPlugin = require('webpack-browser-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var path = require('path');
var argv = require('yargs').argv;
var ENV = require('../env.json');

config.plugins = [];
if (argv.browser) {
  config.plugins.push(new WebpackBrowserPlugin());
}
var env = 'DEV';
var prod = false;
if (argv.prod) {
  env = 'PROD';
  prod = true;
}
config.plugins.push(new webpack.DefinePlugin({
  WEBPACK_API_ENDPOINT: JSON.stringify(ENV.API_ENDPOINT),
  WEBPACK_ENV: JSON.stringify(env),
  WEBPACK_PROD: prod
}));
if (argv.prod) {
  config.plugins.push(new HtmlWebpackPlugin({template: path.resolve(__dirname, 'app/index.html')}));
  config.plugins.push(new FaviconsWebpackPlugin(path.resolve(__dirname, 'app/img/aowp-logo2.png')));
  /*
   config.plugins.push(new webpack.optimize.UglifyJsPlugin({
   minimize: true,
   compress: true,
   output: {
   comments: false
   }
   }));
   */
}
/*
 Doesn't work with testing */
config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  name: ['app', 'vendor', 'polyfill', 'head']
}));

config.debug = !!argv.debug;
config.context = __dirname;
config.devtool = 'source-map';

config.devServer = {
  historyApiFallback: true,
  port: 9000,
  contentBase: path.join('./app/')
};

config.node = {
  fs: "empty"
};
config.entry = {
  app: path.join('./app/src/main.ts'),
  head: path.join('./app/src/head.ts'),
  polyfill: path.join('./app/src/polyfill.ts'),
  vendor: path.join('./app/src/vendor.ts')
};

config.output = {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].js'
};

config.resolve = {
  alias: {
    'es6-shim': path.join(__dirname, '/node_modules/es6-shim/es6-shim.js')
  },
  root: __dirname,
  extensions: ['', '.ts', '.tsx', '.js', '.json', '.html']
};

config.resolveLoader = {
  root: path.join(__dirname, 'node_modules')
};

config.module = {};
config.module.loaders = require('./webpack/loaders');