import type { Configuration } from "webpack";
import { merge } from "webpack-merge";
import common from "./webpack.common";

const prod: Configuration = merge(common, {
  mode: "production",
<<<<<<< HEAD
  devtool: "source-map",
=======
  devServer: {
    static: {
      directory: "./dist",
    },
    historyApiFallback: true,
    port: 8080,
  },
>>>>>>> c3274505f048efe11bc8b8823ab71af7a3cce79e
});

export default prod;
