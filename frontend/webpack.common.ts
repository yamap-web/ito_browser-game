// 型インポート
import type { RuleSetRule, ResolveOptions, Configuration } from "webpack";

// モジュールインポート
import { DefinePlugin } from "webpack";
import * as path from "path";
import { config } from "dotenv";

// rulesオプション
const rules: RuleSetRule[] = [
  {
    test: [/.ts$/, /.tsx$/],
    exclude: /node_modules/,
    use: [
      {
        loader: "babel-loader",
        options: {
          presets: [
            ["@babel/preset-env"],
            [
              "@babel/preset-react",
              {
                runtime: "automatic",
              },
            ],
            ["@babel/preset-typescript"],
          ],
        },
      },
      {
        loader: "ts-loader",
      },
    ],
  },
  {
    test: /.css$/,
    use: ["style-loader", "css-loader", "postcss-loader"],
  },
];

// resolveオプション
const resolve: ResolveOptions = {
  modules: [__dirname + "/node_modules"],
  extensions: [".ts", ".tsx", ".js"],
  alias: {
    "@": path.resolve(__dirname, "src"),
  },
};

// 開発,本番環境に共通した設定
const common: Configuration = {
  entry: "/src/main.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: { rules },
  resolve,
  plugins: [
    config().parsed !== undefined
      ? new DefinePlugin({
          "process.env": JSON.stringify(process.env),
        })
      : new DefinePlugin({
          "process.env.SERVER_URL": JSON.stringify(process.env.SERVER_URL),
        }),
  ],
};

export default common;
