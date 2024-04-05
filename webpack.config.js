const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const dotenv = require('dotenv');

module.exports = (env,argv) =>{
  const ROOT_PATH = path.resolve('./');
  const DIST_PATH = path.resolve(ROOT_PATH, './dist');
  const mode = argv.mode;
  mode === 'production' ? dotenv.config({path: './.env'}) : dotenv.config({path: './dev.env'}) 
  return {
    mode: process.env.NODE_ENV,
    devtool: process.env.SOURCE_MAP,
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: DIST_PATH,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new ESLintPlugin(),
      new MiniCssExtractPlugin()
    ],
    devServer: {
      static: {
        directory: DIST_PATH,
      },
      hot: true,
      port: 8080,
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.s[ac]ss/i,
          use: [MiniCssExtractPlugin.loader, 'sass-loader']
        },
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.js'],
    }
    }
  }

