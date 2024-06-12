import type { Config } from "postcss-load-config";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

const config: Config = {
  plugins: [tailwindcss(), autoprefixer(), cssnano()],
};

export default config;
