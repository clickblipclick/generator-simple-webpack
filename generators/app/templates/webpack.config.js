var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/bundle.[hash].js'
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html'
  })],
  module: {
    rules: [
      { test: /\.js$/, use: [<% if (includeBabel) { %>"babel-loader", <% } %>"eslint-loader"], exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] }<% if (includeSass) { %>,
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] }<% } %>
    ]
  }
};
