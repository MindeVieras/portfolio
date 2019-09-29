var webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: process.cwd() + '/src/js/index.js',
  output: {
    path: process.cwd() + '/public',
    filename: 'scripts.js'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js'
    }
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether'
    }),
    new CopyWebpackPlugin([
      {
        from: process.cwd() + '/src/images',
        to: process.cwd() + '/public/images',
        flatten: false
      },
      {
        from: process.cwd() + '/src/cv',
        to: process.cwd() + '/public/cv',
        flatten: false
      }
    ])
  ]
};
