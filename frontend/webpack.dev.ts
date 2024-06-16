// 型インポート
import type { Configuration } from "webpack";

// モジュールインポート
import "webpack-dev-server";
import { merge } from "webpack-merge";

// 設定ファイルインポート
import common from "./webpack.common";

// 開発環境での設定
const dev: Configuration = merge(common, {
  mode: "development",
  devServer: {
    static: {
      directory: "./dist",
    },
    historyApiFallback: true,
    port: 8080,
  },
});

export default dev;
