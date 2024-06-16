const DescAccordion = () => {
  return (
    <>
      <div className="collapse collapse-plus rounded-xl border border-slate-100 shadow-md ">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <h2 className="text-xl font-bold collapse-title">ルール</h2>
        <div className="collapse-content">
          <ul>
            <li className="pt-3">
              <p>1. お題を決定（ex. 面積の広い国）</p>
            </li>
            <li className="pt-3">
              <p>2. 各プレイヤーに 1〜100 の数字が配られる</p>
            </li>
            <li className="pt-3">
              <p>
                3. 数字が 100 に近いほどお題に適するもの（ex.
                ロシア）を、1に近いほど適さないもの（ex. バチカン市国）をあげる
              </p>
            </li>
            <li className="pt-3">
              <p>4. 協力して話し合い、数字順に並び替えてクリアを目指そう！</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="collapse collapse-plus rounded-xl border border-slate-100 shadow-md mt-1">
        <input type="radio" name="my-accordion-3" />
        <h2 className="text-xl font-bold collapse-title">お題の例</h2>
        <div className="collapse-content">
          <ul>
            <li className="pt-3">
              <p>・柔らかい食べ物</p>
            </li>
            <li className="pt-3">
              <p>・人気なお寿司のネタ</p>
            </li>
            <li className="pt-3">
              <p>・クレヨンで最初に使い切る色</p>
            </li>
            <li className="pt-3">
              <p>・絶対にクリックしてはいけない迷惑メールのタイトル</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DescAccordion;
