import "webpack-dev-server";
import { merge } from "webpack-merge";

import common from "./webpack.common";

import type { Configuration } from "webpack";

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
