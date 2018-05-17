const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'packages'),
  entry: ['react-hot-loader/patch', './core/init.js', './core/main.scss'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true // true outputs JSX tags
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}  
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['env', 'react'] },
        },
      },      
      {
        test: /\.(sass|scss|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true, minimize: true },
            },
            { loader: 'resolve-url-loader' },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
        }),
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [path.join(__dirname, 'packages'), 'node_modules'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './core/index.html',
      hash: true,
      minify: {
        // removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true,
    }),
  ],
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    proxy: { '/api': 'http://localhost:3000' },
    // proxy: [{
    //   context: ["/bookmarks", "/search"],
    //   target: "http://localhost:3000",
    // }],
  },
};
