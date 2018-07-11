const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const devConfig = require("./webpack.config.dev");
const buildConfig = require("./webpack.config.build");

const commonConfig = {
  entry: "./src/scripts/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "scripts/bundle.[hash].js",
    publicPath: "/"
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html'
  })],
  module: {
    rules: [
      { test: /\.js$/, use: [<% if (includeBabel) { %>"babel-loader", <% } %>"eslint-loader"], exclude: /node_modules/ },
      { test: /\.css$/, use: ["style-loader", "css-loader", "postcss-loader"] }<% if (includeSass) { %>,
      { test: /\.scss$/, use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"] }<% }, %>
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash].[ext]",
              outputPath: "images/",
              limit: 8192
            }
          }
        ]
      }
    ]
  }
};

module.exports = merge(commonConfig, (process.env.NODE_ENV === "production") ? buildConfig : devConfig);
