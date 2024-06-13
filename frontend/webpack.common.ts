const workBoxWebpackPlugin = require("workbox-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
import type { RuleSetRule, ResolveOptions, Configuration } from "webpack";
import { DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import "webpack-dev-server";
import * as path from "path";
import { config } from "dotenv";
const env = config().parsed;

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

const resolve: ResolveOptions = {
  modules: [__dirname + "/node_modules"],
  extensions: [".ts", ".tsx", ".js"],
};

const common: Configuration = {
  entry: "/src/main.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: { rules },
  resolve,
  plugins: [
    env !== undefined
      ? new DefinePlugin({
          "process.env": JSON.stringify(process.env),
        })
      : new DefinePlugin({
          "process.env.SERVER_URL": JSON.stringify(process.env.SERVER_URL),
        }),
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
    }),
    new CopyPlugin({
      patterns: [
        { from: "robots.txt", to: "robots.txt" },
        { from: "./src/favicon.ico", to: "favicon.ico" },
        { from: "./src/ogp.webp", to: "ogp.webp" },
      ],
    }),
    new workBoxWebpackPlugin.GenerateSW({
      swDest: __dirname + "/dist/service-worker.js",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
  ],
};

export default common;
