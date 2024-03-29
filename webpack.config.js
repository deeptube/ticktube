const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// NOTE: PWA用のプラグイン
const workBoxWebpackPlugin = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

const getEntries = require("./config/webpack/utils/getEntries.js");
const buildHtmlWebpackPlugins = require("./config/webpack/utils/buildHtmlWebpackPlugins.js");

const JAVASCRIPT_ENTRY_PATH = "./src/javascripts/entries/";
const HTML_TEMPLATE_PATH = "./src/pages/";
const OUTPUT_PATH = `${__dirname}/dist`;
const entries = getEntries(JAVASCRIPT_ENTRY_PATH);

module.exports = {
  // ビルド時のモード
  // development: ビルド時間が短くソースマップに対応しているが容量の圧縮がかからない。
  // production: 本番用build、コメント削除等の圧縮がかかり容量が少ない(デフォルト)
  mode: "development",
  // jsのエントリーポイント
  // デフォルトはsrc/index.js
  // ここではentriesを渡してJAVASCRIPT_ENTRY_PATH配下のjs/tsをentryとするようにしている
  entry: entries,
  // 出力設定
  // デフォルトはdist/main.js
  output: {
    // 出力先のディレクトリ
    path: OUTPUT_PATH,
    // 出力先のファイル
    filename: "[name]-[hash].js",
  },
  // webpack-dev-server用の設定
  devServer: {
    // webpackのoutput pathを指定
    contentBase: OUTPUT_PATH,
    // 実行時にブラウザを開く
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.html/,
        use: ["html-loader"],
      },
      // stylesheetのbuild用の設定
      {
        test: /\.scss|\.css/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        enforce: "pre",
        test: /\.js|\.ts|\.vue$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            // NOTE: デフォルトで使うとES2015(ES6)に変換してくれる
            // Sidenote, if no targets are specified, @babel/preset-env will transform all ECMAScript 2015+ code by default.
            // https://babeljs.io/docs/en/babel-preset-env
            plugins: [
              // NOTE: `ReferenceError regeneratorRuntime is not defined`が発生していたので解消
              // https://github.com/babel/babel/issues/9849#issuecomment-612595221
              "@babel/plugin-transform-runtime",
            ],
          },
        },
      },
      {
        test: /\.ts/,
        exclude: /(node_modules|bower_components)/,
        loader: "ts-loader",
        options: {
          // /vueをtypescriptとして扱う
          appendTsSuffixTo: [/\.vue/],
        },
      },
      {
        test: /\.vue/,
        loader: "vue-loader",
        options: {
          loaders: {
            scss: "vue-style-loader!css-loader!sass-loader", // <style lang="scss">
          },
        },
      },
      {
        test: /\.json$/,
        loader: "json-loader",
        type: "javascript/auto",
      },
    ],
  },
  resolve: {
    // import時にtsとjsを見分けられるようにするため拡張子を配列で指定
    extensions: [".ts", ".js", ".vue"],
    // Webpackで利用するときの設定
    alias: {
      vue: "vue/dist/vue.js",
      "@js": `${__dirname}/src/javascripts`,
      "@css": `${__dirname}/src/styles`,
    },
  },
  plugins: [
    // 個別のbuild後のjsを読み込むHTMLを生成
    ...buildHtmlWebpackPlugins(entries, HTML_TEMPLATE_PATH),
    // CSSを別ファイルでbuildする
    new MiniCssExtractPlugin({ filename: "[name]-[hash].css" }),
    // build後に古いファイルを消す
    new CleanWebpackPlugin(),
    // vue-loaderの有効化
    new VueLoaderPlugin(),
    // PWA用のservice-worker.jsを生成
    new workBoxWebpackPlugin.GenerateSW({ swDest: OUTPUT_PATH + "/service-worker.js" }),
    // NOTE: 公式readmeがsnamecaseになっていたのでdisable
    // https://github.com/arthurbergmz/webpack-pwa-manifest
    /* eslint-disable @typescript-eslint/camelcase */
    new WebpackPwaManifest({
      short_name: "ticktube",
      name: "Tick Tube",
      display: "standalone",
      start_url: "index.html",
    }),
    /* eslint-enable @typescript-eslint/camelcase */
  ],
};
