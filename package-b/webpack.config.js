const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  entry: ['./src/index'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 8081,
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
    new ModuleFederationPlugin({
      name: 'package_b',
      shareScope: 'package_b_shared_scope',
      filename: 'remoteEntry.js',
      exposes: {
        './performance': './src/performance',
      },
    }),
  ],
};
