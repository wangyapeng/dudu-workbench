const webpack = require('webpack');
const path = require("path");
const rootPath = process.cwd();
const configPath = path.resolve(rootPath, 'config');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const resolve = (dir) => path.resolve(__dirname, dir);
const isProduction = process.env.NODE_ENV === 'production';
const config = {
  mode: isProduction ? 'production' : "development",
  entry: {
    app:"./src/app.js",
    shared: ['vue','vuex','vue-router','element-plus']
  },
  target: "web",
  devtool: isProduction ?'source-map' :"inline-source-map",
  output: {
    // publicPath: '//cdnURL.com', //指定存放JS⽂件的CDN地址
    filename: "[name].bundle.js",
    path: path.resolve(rootPath, "dist"),
    chunkFilename: '[id].js',
    clean: true,
  },
  resolve: {
    alias: {
      '@': resolve('./src'),
      // 'vue': "vue/dist/vue.esm-bundler.js"
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/i,
        loader: "vue-loader",
      },
      {
        test: /\.less$/i,
        use: [
          !isProduction?'style-loader': MiniCssExtractPlugin.loader,
          "css-loader", "less-loader", {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          }],
      },
      {
        test: /\.css$/i,
        use: [!isProduction?'style-loader': MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpg|png|gif)$/, // 针对这三种格式的文件使用file-loader处理
        use: {
          loader: "file-loader",
          options: {
            // 定义打包后文件的名称；
            // [name]:原文件名，[hash]:hash字符串（如果不定义名称，默认就以hash命名，[ext]:原文件的后缀名）
            name: "[name]_[hash].[ext]",
            outputPath: "images/", //  定义图片输出的文件夹名（在output.path目录下）
            limit: 204800, // 大于200kb的图片会被打包在images文件夹里面，小于这个值的会被以base64的格式写在js文件中
          },
        },
      },
    ],
  },
  optimization: {
    chunkIds: 'named',
    minimizer: [
      // `...`,
      new CssMinimizerPlugin(),
    ],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: true,
    }),
  ],
  devServer: {
    static: {
      directory: path.join(rootPath, "public"),
    },
    proxy: {
      "/api": {
        target: "http://localhost:9002",
        pathRewrite: { "^/api": "" },
      },
    },
    server: "http",
    liveReload: true,
    hot: true,
    historyApiFallback: true,
    compress: true,
    port: 3001,
  },
};
module.exports = config