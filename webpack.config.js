const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ForkTSCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  const config = {
    mode: isProduction ? 'production' : 'development',
    entry: ['./src/app/index.tsx'],
    output: {
      path: path.resolve(__dirname, 'public/app'),
      publicPath: '/',
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      pathinfo: false,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      modules: [
        path.resolve(__dirname, 'lib'),
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules'),
      ],
      plugins: [new TsconfigPathsPlugin()],
      symlinks: false,
      cacheWithContext: false,
    },
    node: {
      fs: 'empty'
    },
    module: {
      rules: [{
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'cache-loader',
        }, {
          loader: 'babel-loader',
          options: {
            'presets': [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            'babelrcRoots': [
              './src',
              './lib'
            ]
          }
        }]
      }, {
        test: /\.(woff(2)?|ttf|eot|svg|png|gif)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: isProduction ? '[name].[contenthash].[ext]' : '[name].[ext]',
            outputPath: 'static/'
          }
        }]
      }, {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      }]
    },
    devtool: !isProduction ? 'source-map' : false,
    devServer: {
      historyApiFallback: true,
      port: 8080,
      proxy: {
        '/api/': {
          context: () => true,
          target: 'http://[::1]:8000',
          secure: false,
          changeOrigin: true,
          headers: {
            Connection: 'keep-alive',
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
          },
        },
        '/admin/': {
          target: {
            host: '127.0.0.1',
            protocol: 'http:',
            port: 8000,
          },
        }
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        API_URL: JSON.stringify(process.env.API_URL),
        RECAPTCHA_SITE_KEY: JSON.stringify(process.env.RECAPTCHA_SITE_KEY),
        MATCHER_URL: JSON.stringify(process.env.MATCHER_URL),
        IS_PRODUCTION: JSON.stringify(isProduction),
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `./src/app/index.html`),
        env: isProduction ? 'production' : 'development',
        inject: 'body',
        minify: {
          collapseWhitespace: isProduction,
        }
      }),
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        failOnError: true,
        cwd: process.cwd(),
      }),
      new CleanWebpackPlugin(),
      new ForkTSCheckerWebpackPlugin({
        tslint: './tslint.json',
      }),
    ],
    stats: 'errors-only',
    optimization: {
      splitChunks: {
        chunks: 'async',
      }
    }
  };

  if (isProduction) {
    config.plugins.push(new CompressionPlugin({
      filename: '[path].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.ttf$|\.html$/,
      threshold: 10240,
      minRatio: 0.9
    }));

    config.plugins.push(new ScriptExtHtmlWebpackPlugin({
      inline: 'main'
    }))
  }

  return config;
};
