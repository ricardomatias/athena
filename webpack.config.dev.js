const path = require('path');

const webpack = require('webpack');

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  entry: {
    index: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      `${resolve('client')}/index.js`
    ]
  },
  output: {
    path: '/',
    filename: '[name].js',
    publicPath: resolve('public/')
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
          presets: [ [ 'es2015', { modules: false } ], 'react' ],
          plugins: [ 'react-hot-loader/babel' ]
        }
      }
    ]
  },
  devtool: 'source-map', // 'cheap-module-eval-source-map' or 'eval-source-map'
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      // Specify the common bundle's name
      name: 'vendor',
      // this assumes your vendor imports exist in the node_modules directory
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.NamedModulesPlugin()
  ]
};
