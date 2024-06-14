import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { GameData } from "../interfaces/interface";
import { socket } from "../utils/socket";
import SocketEvent from "../class/socketEvents";

import HeadBlock from "./HeadBlock";

interface StandbyProps {
  isHost: boolean;
  gameData: GameData[];
  roomId: string;
  setErrorMsg: Dispatch<SetStateAction<string>>;
}

const Standby = ({ isHost, gameData, roomId, setErrorMsg }: StandbyProps) => {
  return (
    <>
      <HeadBlock title="ito | On Standby Now..." />
      <div className="flex flex-col justify-center flex-grow container mx-auto mt-10 lg:mt-0 px-4">
        <DisplayIdCard isHost={isHost} roomId={roomId} />
        <div className="flex flex-col lg:flex-row items-center justify-center mb-10">
          <div className="max-w-sm w-full">
            <PlayersStat gameData={gameData} />
            <PlayersList gameData={gameData} />
          </div>
          <div className="max-w-2xl w-full mt-4 lg:mt-0 lg:ml-6">
            <DisplayRuleAccordion />
            <InputThemeForm
              isHost={isHost}
              roomId={roomId}
              setErrorMsg={setErrorMsg}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const DisplayIdCard = ({
  isHost,
  roomId,
}: {
  isHost: boolean;
  roomId: string;
}) => {
  const onClickCopy = () => navigator.clipboard.writeText(roomId);

  if (isHost) {
    return (
      <div className="flex justify-center mb-4">
        <div className="card bg-primary/30 flex items-center w-full max-w-sm lg:max-w-md rounded-2xl shadow-md mt-2">
          <div className="card-body p-4">
            <div className="lg:text-xl">
              ルームID：
              <span className="mx-2 text-3xl lg:text-5xl font-bold">
                {roomId}
              </span>
              <div className="tooltip tooltip-secondary" data-tip="copy">
                <button
                  className="text-primary hover:text-primary/50"
                  onClick={() => onClickCopy()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-center text-sm lg:text-md">参加者に伝えよう！</p>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const PlayersStat = ({ gameData }: { gameData: GameData[] }) => {
  return (
    <div className="stat text-center">
      <div className="stat-title">Player</div>
      <div className="stat-value">{gameData.length + " / 10"}</div>
    </div>
  );
};

const PlayersList = ({ gameData }: { gameData: GameData[] }) => {
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

const InputThemeForm = ({
  isHost,
  roomId,
  setErrorMsg,
}: {
  isHost: boolean;
  roomId: string;
  setErrorMsg: Dispatch<SetStateAction<string>>;
}) => {
  const [theme, setTheme] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTheme(value);
    // setErrorMsg("");
  };

  const handleStartBtnClick = () => {
    if (theme === "") {
      setErrorMsg("お題を入力してください。");
      return;
    }
    const parameter = { roomId, theme };
    socket.emit(SocketEvent.REQ_START, JSON.stringify(parameter));
  };

  if (isHost) {
    return (
      <div className="flex flex-col lg:flex-row max-w-3xl w-full my-4">
        <input
          type="text"
          className="input input-bordered input-primary border-4 border-primary w-full"
          placeholder="お題を入力"
          onChange={handleInputChange}
          name="theme"
        />
        <button
          className="btn btn-primary mt-2 lg:mt-0 lg:ml-4"
          onClick={handleStartBtnClick}
        >
          ゲーム開始！
        </button>
      </div>
    );
  } else {
    return (
      <div
        className="flex items-center justify-center my-6"
        aria-label="待機中"
      >
        <div className="animate-spin h-10 w-10 border-4 border-secondary rounded-full border-t-transparent"></div>
        <p className="text-secondary pl-4">ゲームの開始を待っています</p>
      </div>
    );
  }
};

export default Standby;
