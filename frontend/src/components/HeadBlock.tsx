import { Helmet } from "react-helmet-async";

const HeadBlock = ({ title }: { title: string }) => {
  return (
    <Helmet>
      {/* title */}
      <title>{title ?? "ito(イト) | 価値観共有ゲーム"}</title>

      {/* meta */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="大人気パーティーゲームがブラウザ版アプリとして遊べるようになりました。ルールは1つ、数字を口に出したらアウト！テーマに沿ってその数字の大きさを表現し合い、配られた1~100のカードの並び順を協力して当ててクリアを目指します。"
      />
      <meta name="format-detection" content="telephone=no" />

      {/* favicon */}
      <link rel="icon" href="favicon.ico" />
      <link rel="apple-touch-icon" href="webclip.png" />

      {/* ogp */}
      <meta property="og:site_name" content="ito(イト)" />
      <meta property="og:url" content="https://www.ito-game.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="ito(イト) | 価値観共有ゲーム" />
      <meta
        property="og:description"
        content="大人気パーティーゲームがブラウザ版アプリとして遊べるようになりました。ルールは1つ、数字を口に出したらアウト！テーマに沿ってその数字の大きさを表現し合い、配られた1~100のカードの並び順を協力して当ててクリアを目指します。"
      />
      <meta property="og:image" content="https://www.ito-game.com/ogp.webp" />
      <meta property="og:locale" content="ja_JP" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@yamap_web" />
      <meta
        name="twitter:description"
        content="大人気パーティーゲームがブラウザ版アプリとして遊べるようになりました。ルールは1つ、数字を口に出したらアウト！テーマに沿ってその数字の大きさを表現し合い、配られた1~100のカードの並び順を協力して当ててクリアを目指します。"
      />
      <meta
        name="twitter:image:src"
        content="https://www.ito-game.com/ogp.webp"
      />
    </Helmet>
  );
};

export default HeadBlock;
