interface HeaderProps {
  playing: boolean;
  playToggle: () => void;
}

const Header = ({ playing, playToggle }: HeaderProps) => {
  const audioSwapText = playing ? "音楽を停止" : "音楽を再生";

  return (
    <header className="navbar flex justify-between bg-gradient-to-r from-primary to-secondary">
      <div className="ml-4">
        <span className="text-3xl text-white font-bold">ito</span>
        <span className="pl-4 text-white">意思疎通ゲーム</span>
      </div>
      <div className="mr-2">
        <div
          className="flex tooltip tooltip-bottom tooltip-primary"
          data-tip={audioSwapText}
        >
          <label className="swap" aria-label="音楽再生の切り替え">
            <input type="checkbox" onClick={playToggle} />
            <svg
              className="swap-on fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
            </svg>
            <svg
              className="swap-off fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z" />
            </svg>
          </label>
        </div>
        <div
          className="flex tooltip tooltip-bottom tooltip-primary"
          data-tip="ルール"
        >
          <label
            htmlFor="ruleModal"
            className="btn btn-link"
            aria-label="ゲームルールの表示切り替え"
          >
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
          </label>
        </div>
        <RuleModal />
      </div>
    </header>
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
