import { Helmet } from "react-helmet-async";

const HeadBlock = ({ title }: { title: string }) => {
  return (
    <Helmet>
      <title>{title ?? "ito(イト) | 意思疎通ゲーム"}</title>
    </Helmet>
  );
};

export default HeadBlock;
