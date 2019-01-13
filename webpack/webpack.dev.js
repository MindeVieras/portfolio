
var webpack = require('webpack')

module.exports = {
  mode: 'development',
  devServer: {
    inline: true,
    historyApiFallback: true,
    contentBase: process.cwd()+'/src',
    port: 8080
  },
  devtool: 'eval-source-map',
  entry: process.cwd()+'/src/js/main.js',
  output: {
    path: process.cwd()+'/dist',
    filename: 'scripts.min.js'
  },
  resolve: {
    extensions: ['.js']
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
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader'
        }]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
            loader: 'file-loader'
        }]
      }
    ]
  }
}
