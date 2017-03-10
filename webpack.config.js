const path = require('path');

const webpack = require('webpack');

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  entry: {
    index: './client/index.js'
  },
  output: {
    path: resolve('public/'),
    filename: '[name].js'
  },
  resolve: {
    modules: [
      path.resolve('./client'),
      path.resolve('./node_modules'),
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [ [ 'es2015', { modules: false } ], 'react' ]
        }
      }
    ]
  },
  devtool: 'source-map', // 'cheap-module-eval-source-map' or 'eval-source-map'
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // Specify the common bundle's name.
      minChunks: function (module) {
         // this assumes your vendor imports exist in the node_modules directory
         return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
};
