const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.resolve(__dirname, '../src');

const webpackConfig = env => {
  return {
    context: srcPath,
    entry: {
      bundle: [
        '@babel/polyfill',
        path.join(srcPath, './index.js'),
      ],
    },
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: '[name].[hash].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(scss|sass)$/,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/,
          use: [
            'url-loader?limit=10000',
            {
              loader: 'image-webpack-loader',
              query: {
                mozjpeg: {
                  progressive: true,
                },
                gifsicle: {
                  interlaced: false,
                },
                optipng: {
                  optimizationLevel: 7,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4,
                },
              },
            }
          ]
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          use: 'file-loader'
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?prefix=font/&limit=5000'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=10000&mimetype=application/octet-stream'
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      alias: {
        Assets: path.resolve(__dirname, '../public/assets/'),
        Module: path.resolve(__dirname, '../src/modules/'),
        // Config: path.resolve(__dirname, 'config/'),
        // Media: path.resolve(__dirname, 'config/media.js'),
        // Logger: path.resolve(__dirname, 'config/logger.js'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'React & Webpack Boilerplate',
        filename: 'index.html',
        template: path.resolve(__dirname, '../public/index.html'),
        showErrors: true,
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.EnvironmentPlugin({
        NODE_ENV: env.NODE_ENV,
      }),
    ],
    devServer: {
      hot: true,
      https: true,
      disableHostCheck: true,
      historyApiFallback: true,
      host: '0.0.0.0',
      port: 3000,
    },
  };
};

module.exports = webpackConfig;