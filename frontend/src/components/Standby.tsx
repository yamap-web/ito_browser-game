import { useNavigate } from "react-router-dom";

interface MemberProps {
  userName: string;
  answer: string;
  index: number;
}

const Standby = () => {
  //#region デバッグ用パラメータ
  const members: MemberProps[] = [
    {
      userName: "AAA",
      answer: "",
      index: 0,
    },
    {
      userName: "BBB",
      answer: "",
      index: 1,
    },
  ];
  //#endregion

  return (
    <div className="flex flex-col lg:flex-row flex-grow items-center justify-center container mx-auto px-4">
      <div className="max-w-sm w-full">
        <PlayersStat members={members} />
        <PlayersList members={members} />
      </div>
      <div className="max-w-2xl w-full mt-4 lg:mt-0 lg:ml-6">
        <DisplayRuleAccordion />
        <InputThemeForm />
      </div>
    </div>
  );
};

const PlayersStat = (props: { members: MemberProps[] }) => {
  return (
    <div className="stat text-center">
      <div className="stat-title">Player</div>
      <div className="stat-value">{props.members.length + " / 10"}</div>
    </div>
  );
};

const PlayersList = (props: { members: MemberProps[] }) => {
  return (
    <>
      <div className="overflow-x-auto border-2 border-zinc-100 rounded-3xl shadow-md">
        <table className="table">
          <thead>
            <tr>
              <th className=""></th>
              <th className="w-full">Name</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, index) => {
              if (props.members.length > index) {
                return (
                  <tr key={"record_" + index}>
                    <th>{index + 1}</th>
                    <td>{props.members[index].userName}</td>
                  </tr>
                );
              } else {
                return (
                  <tr key={"record_" + index}>
                    <th>{index + 1}</th>
                    <td></td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

const DisplayRuleAccordion = () => {
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

const InputThemeForm = () => {
  const navigate = useNavigate();
  const handlePlayGame = () => {
    navigate("/play");
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-3xl w-full my-4">
      <input
        type="text"
        className="input input-bordered w-full"
        placeholder="お題を入力"
      />
      <button
        className="btn btn-primary mt-2 lg:mt-0 lg:ml-4"
        onClick={handlePlayGame}
      >
        Game Start!
      </button>
    </div>
  );
};

export default Standby;
