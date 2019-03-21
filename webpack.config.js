const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')

const distFolder = path.resolve(__dirname, 'dist')
const jsLoader = 'babel-loader!standard-loader?error=true'

const isDevelopment = process.env.NODE_ENV !== 'prod'

module.exports = {
  entry: './src/index.js',
  mode: isDevelopment ? 'development' : 'production',
  output: {
    filename: '[name].bundle.js?[hash]',
    path: distFolder
  },
  devServer: {
    contentBase: './dist/',
    https: false,
    host: 'localhost',
    port: 8080,
    hot: true,
    inline: true,
    stats: { colors: true }
  },
  devtool: isDevelopment ? 'eval-source-map' : false,
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true,
      title: 'Beer æpp',
      baseUrl: '/',
      APIUrl: 'http://localhost:8080/',
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    new ExtractTextPlugin('style.css?[hash]'),
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: distFolder }),
    new CopyWebpackPlugin([
      {
        from: 'static',
        to: '',
        ignore: ['.*']
      }
    ]),
    new VueLoaderPlugin()
    // debug bundle (for optimisation)
    // new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        // standard setting for most bundlers web-app setup
        // entirely excludes the node_modules folder
        exclude: [/node_modules/],
        // ...but when using external ES Modules you need to
        // include required externals ES modules (eg. our Aepp-SDK) like so:
        include: [/node_modules\/@aeternity/, /node_modules\/rlp/, /node_modules\/vue-qrcode-reader/],
        loader: jsLoader
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            'postcss-loader'
          ]
          // publicPath: '/dist'
        })
      },
      // allows vue compoents in '<template><html><script><style>' syntax
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: jsLoader
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
