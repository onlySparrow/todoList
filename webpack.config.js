const path = require('path')
const webpack = require('webpack')
const uglify = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',//入口文件  
  output: {
    path: path.resolve(__dirname, './dist'),//输出路径
    publicPath: '/dist/',
    filename: 'vue-todolist.min.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.less$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'less-loader' }
      ]
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src'), resolve('test')]
    },
    {
      test: /\.(png|jpg|gif|ttf|svg|woff|eot)$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: '[name].[ext]?[hash]'
      }
    }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new uglify(
      {
        uglifyOptions: {
          output: {
            beautify: false,
            comments: false
          },
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true
          },
        }
      }
    ),
    new HtmlWebpackPlugin({
      inject: true,
      // filename: path.join(__dirname, '../examples/dist/index.html'),
      template: path.join(__dirname, '../examples/index.html')
    })
  ]
};  