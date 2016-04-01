var url = require('url');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, './index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'pagination-control-example.js',
    devtoolModuleFilenameTemplate: function (info) {
      var comps = url.parse(info.absoluteResourcePath);

      if (comps.protocol) {
        return info.absoluteResourcePath;
      }

      return 'webpack-src:///pagination-control-example/' + path.relative('.', info.absoluteResourcePath);
    },
  },
  module: {
    preLoaders: [
      { test: /\.js$/, loader: "source-map-loader" },
    ],
  },
  resolve: {
    alias: {
      'pagination-control': path.resolve(__dirname, '../..'),
    },
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
  ],
  devtool: 'source-map',
};
