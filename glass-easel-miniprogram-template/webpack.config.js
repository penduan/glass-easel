/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')
const {
  GlassEaselMiniprogramWebpackPlugin,
  GlassEaselMiniprogramWxmlLoader,
  GlassEaselMiniprogramWxssLoader,
} = require('glass-easel-miniprogram-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [
  {
    mode: 'development',
    entry: './src/index.js', // this file is virtually generated by the plugin
    output: {
      filename: 'index.js',
      path: path.join(__dirname, 'dist'),
      module: false,
      iife: true,
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          // wxml should be explicit handled with a loader
          test: /\.wxml$/,
          use: GlassEaselMiniprogramWxmlLoader,
          exclude: /node_modules/,
        },
        {
          // wxss should be explicit handled like CSS
          test: /\.wxss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            GlassEaselMiniprogramWxssLoader,
            // add more loaders here if you work with less, sass, Stylus, etc.
          ],
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'index.css',
      }),
      new GlassEaselMiniprogramWebpackPlugin({
        // the path of the mini-program code directory
        path: path.join(__dirname, 'src'),
        // the resouce files that should be copied to the dist directory
        resourceFilePattern: /\.(jpg|jpeg|png|gif|html)$/,
        // the default entry
        defaultEntry: 'pages/index/index',
      }),
    ],
  },
]
