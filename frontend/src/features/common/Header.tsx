import AudioSwap from "./AudioSwap";

const Header = () => {
  return (
    <header className="navbar flex justify-between bg-gradient-to-r from-primary to-secondary">
      <div className="ml-4">
        <span className="text-3xl text-white font-bold">ito</span>
        <span className="pl-4 text-white">意思疎通ゲーム</span>
      </div>
      <div className="mr-2">
        <AudioSwap />
        <div
          className="flex tooltip tooltip-bottom tooltip-primary"
          data-tip="ルール"
        >
          <label
            htmlFor="ruleModal"
            className="btn btn-link"
            aria-label="ゲームルールの表示切り替え"
          >
            <RuleIcon />
          </label>
        </div>
        <RuleModal />
      </div>
    </header>
  );
};

const RuleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-8 text-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
      />
    </svg>
  );
};

const RuleModal = () => {
  return (
    <>
      <input
        type="checkbox"
        className="modal-toggle"
        id="ruleModal"
        name="RuleModal"
      />
      <div className="modal" role="dialog" aria-label="ゲームルールの説明">
        <div className="modal-box">
          <h3 className="text-lg font-bold mb-4">ルールの説明</h3>
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
        <label className="modal-backdrop" htmlFor="ruleModal">
          Close
        </label>
      </div>
    </>
  );
};

export default Header;
