var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: 'src/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/bundle.[hash].js'
  },
  plugins: [new HtmlWebpackPlugin()]
};
