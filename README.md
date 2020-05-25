# TickTube

YouTubeの動画をTickTokライクなUIで閲覧できるViewer :tv:

![demo](https://github.com/Madogiwa0124/ticktube/blob/master/assets/demo.gif)

最初に表示された画面でYouTubeDataAPIのAPIキーと検索に使うKeyword(任意)を入力してください。

# コマンド

* `npm run build` : webpackのビルド
* `npm run build-watch` : webpackにwatchオプションを付けてビルド
* `npm run build-dev-server` : webpack-dev-serverの起動

# 構成

```
src
 ├ javascripts
 │ ├ entries    // webpackのエントリーファイル
 │ ├ components // コンポーネント格納用
 │ └ types      // typescriptの型定義ファイル格納用
 ├ styles        // stylesheet格納用(scss)
 └ pages         // htmlのtamplate格納用
```
