const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const { RuntimeGlobals } = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/bootstrap.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 8080,
    static: './dist',
    open: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    // new ModuleFederationPlugin({
    //   name: 'package_a',
    //   shareScope: 'package_a_shared_scope',
    //   remotes: {
    //     package_b: 'package_b@http://localhost:8081/remoteEntry.js',
    //   },
    //   filename: 'remoteEntry.js',
    // }),
  ],
};
