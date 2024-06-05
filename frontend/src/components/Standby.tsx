import { useNavigate } from "react-router-dom";
import type { GameData, StandbyProps } from "../interfaces/interface";

const Standby = (props: StandbyProps) => {
  const { isHost, gameData, roomId } = props;

  return (
    <div className="flex flex-col justify-center flex-grow container mx-auto mt-10 lg:mt-0 px-4">
      <DisplayIdCard isHost={isHost} roomId={roomId} />
      <div className="flex flex-col lg:flex-row items-center justify-center mb-10">
        <div className="max-w-sm w-full">
          <PlayersStat gameData={gameData} />
          <PlayersList gameData={gameData} />
        </div>
        <div className="max-w-2xl w-full mt-4 lg:mt-0 lg:ml-6">
          <DisplayRuleAccordion />
          <InputThemeForm isHost={props.isHost} />
        </div>
      </div>
    </div>
  );
};

const DisplayIdCard = (props: { isHost: boolean; roomId: string }) => {
  const { isHost, roomId } = props;

  if (isHost) {
    return (
      <div className="flex justify-center mb-4">
        <div className="card bg-base-200 flex items-center w-full max-w-sm lg:max-w-md rounded-2xl border border-slate-100 shadow-md mt-2">
          <div className="card-body p-4">
            <p className="lg:text-xl">
              ルームID：
              <span className="ml-2 text-3xl lg:text-5xl font-bold">
                {roomId}
              </span>
            </p>
            <p className="text-center text-sm lg:text-md">参加者に伝えよう！</p>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const PlayersStat = (props: { gameData: GameData[] }) => {
  const { gameData } = props;

  return (
    <div className="stat text-center">
      <div className="stat-title">Player</div>
      <div className="stat-value">{gameData.length + " / 10"}</div>
    </div>
  );
};

const PlayersList = (props: { gameData: GameData[] }) => {
  const { gameData } = props;

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
              if (gameData.length > index) {
                return (
                  <tr key={"record_" + index}>
                    <th>{index + 1}</th>
                    <td>{gameData[index].userName}</td>
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

const InputThemeForm = (props: { isHost: boolean }) => {
  const { isHost } = props;
  const navigate = useNavigate();
  const handlePlayGame = () => {
    navigate("/play");
  };

  if (isHost) {
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
  } else {
    return null;
  }
};

export default Standby;
