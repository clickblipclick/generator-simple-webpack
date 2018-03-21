const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/bundle.[hash].js'
  },
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }<% if (includeSass) { %>,
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'scss-loader'] }<% } %>
    ]
  }
};
