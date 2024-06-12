import type { Configuration } from "webpack";
import { merge } from "webpack-merge";
import common from "./webpack.common.js";

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
