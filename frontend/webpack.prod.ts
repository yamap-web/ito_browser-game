import type { Configuration } from "webpack";
import { merge } from "webpack-merge";
import common from "./webpack.common.js";

const prod: Configuration = merge(common, {
  mode: "production",
});

export default prod;
