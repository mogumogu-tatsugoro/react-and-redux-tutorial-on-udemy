const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const publidDir = path.join(__dirname, '/public');
const Dotenv = require('dotenv-webpack');

module.exports = [
  {
    entry: [
      './src/index.jsx',
    ],
    node: {
      fs: 'empty'
    },
    output: {
      path: publidDir,
      publicPath: '/',
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      }],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devServer: {
      historyApiFallback: true,
      contentBase: publidDir,
    },
    plugins: [
      new Dotenv(),
    ],
  },
  {
    entry: [
      './src/index.js',
    ],
    node: {
      fs: 'empty'
    },
    output: {
      path: publidDir,
      publicPath: '/',
      filename: 'index.js',
    },
    module: {
      rules: [{
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      }],
    },
    resolve: {
      extensions: ['.js'],
    },
    devServer: {
      historyApiFallback: true,
      contentBase: publidDir,
    },
    plugins: [
      new Dotenv(),
    ],
  },
  {
    entry: {
      style: './stylesheets/index.scss',
    },
    output: {
      path: publidDir,
      publicPath: '/',
      filename: 'bundle.css',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }),
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('bundle.css'),
    ],
  },
];
