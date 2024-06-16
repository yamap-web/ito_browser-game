// 型インポート
import type { Configuration } from "webpack";

// モジュールインポート
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import * as path from "path";
import { merge } from "webpack-merge";

// 設定ファイルインポート
import common from "./webpack.common";

// 本番環境での設定
const prod: Configuration = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/assets", to: "." },
        { from: "public", to: "." },
      ],
    }),
  ],
  devtool: "source-map",
});

export default prod;
