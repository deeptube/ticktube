# TickTube

YouTubeの動画をTickTokライクなUIで閲覧できるViewer :tv:

![demo](https://github.com/Madogiwa0124/ticktube/blob/master/assets/demo.gif)

GETパラメーターでYouTubeDataAPIのAPIキーを`apiKey`として渡してください。
検索結果から表示する動画の絞り込みを行う場合は検索キーを`keyword`を設定してください。

例) http://localhost:8080/?keyword=NEWSapiKey=FooBarBaz

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
