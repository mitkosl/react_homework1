var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

const srcFolder = 'src';
const distFolder = 'dist';

module.exports = {
  context: path.join(__dirname, srcFolder),
  resolve: {
    alias: {
      root: path.join(__dirname, srcFolder, 'ts')
    },
    extensions: ['.js', '.ts', '.tsx', '.json']
  },
  entry: {
    app: './ts/index.tsx',
    appStyles: './css/styles.css',
    vendor: './vendor'
  },
  output: {
    path: path.join(__dirname, distFolder, 'js'),
    filename: '[name].js',
    //publicPath: '/js'
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader'
      },
      {
        test: /\.scss$/,
        exclude: [path.join(__dirname, srcFolder, 'ts')],
        use: [{
            loader: 'style-loader'
          }, // inject CSS to page
          {
            loader: 'css-loader'
          }, // translates CSS into CommonJS modules
          {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function () { // post css plugins, can be exported to postcss.config.js
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            },
          }
        ]
      },
      // Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
      // Using here url-loader and file-loader
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
    ],
  },
  // For development https://webpack.js.org/configuration/devtool/#for-development
  devtool: 'inline-source-map',
  devServer: {
    // files are served from this folder
    //contentBase: 'dist',
    hot: true,
    inline: true,
    historyApiFallback: true,
    port: 8080,
    noInfo: true,
    // proxy requests to the JSON server REST service
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000'
      }
    }
  },
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
      hash: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
  ],
};