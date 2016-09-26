var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, './index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'pagination-control-example.js',
    devtoolModuleFilenameTemplate: function (info) {
      if (path.isAbsolute(info.absoluteResourcePath)) {
        return 'webpack-src:///pagination-control-example/' + path.relative('.', info.absoluteResourcePath).replace(/\\/g, '/');
      }
      return info.absoluteResourcePath;
    },
  },
  resolve: {
    alias: {
      'pagination-control': path.resolve(__dirname, '../..'),
    },
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
  ],
  devtool: 'inline-source-map',
};
