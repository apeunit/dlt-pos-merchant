const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const dist_folder = path.resolve(__dirname, 'dist');

module.exports = {
  entry: './src/index.js',
  mode: process.env.NODE_ENV == 'prod' ? 'production' : 'development',
  output: {
    filename: '[name].bundle.js?[hash]',
    path: dist_folder
  },
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true,
      title: 'Beer Æpp',
      baseUrl: '/',
      APIUrl: 'http://localhost:8080/',
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    new ExtractTextPlugin('style.css?[hash]'),
    new CleanWebpackPlugin([dist_folder]),
    // debug bundle (for optimisation)
    // new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(s[ac]ss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            'sass-loader',
            'postcss-loader'
          ]
          // publicPath: '/dist'
        })
      },
      //allows vue compoents in '<template><html><script><style>' syntax
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'standard-loader?error=true'
            // scss: 'vue-style-loader!css-loader!sass-loader',
            // sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // extractCSS: true
          // other vue-loader options go here
        }
      }
    ]
  }
}
