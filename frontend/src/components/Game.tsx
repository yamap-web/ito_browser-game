import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { GameData } from "../interfaces/interface";
import { socket } from "../utils/socket";
import SocketEvent from "../class/socketEvents";

import HeadBlock from "./HeadBlock";
import DisplayAnswersSection from "./DisplayAnswersSection";

interface GameProps {
  isHost: boolean;
  gameData: GameData[];
  setGameData: Dispatch<SetStateAction<GameData[]>>;
  roomId: string;
  theme: string;
  number: number;
}

const Game = ({
  isHost,
  gameData,
  setGameData,
  roomId,
  theme,
  number,
}: GameProps) => {
  return (
    <>
      <HeadBlock title="ito | Playing Game!" />
      <div className="flex flex-col flex-grow items-center justify-center container mx-auto px-4">
        <DisplayThemeCard theme={theme} />
        <DisplayNumberCard number={number} />
        <AnswerForm roomId={roomId} />
        <DisplayAnswersSection
          gameData={gameData}
          setGameData={setGameData}
          roomId={roomId}
        />
        <ResultLink isHost={isHost} gameData={gameData} roomId={roomId} />
      </div>
    </>
  );
};

const DisplayThemeCard = ({ theme }: { theme: string }) => {
  return (
    <div className="card bg-base-100 flex items-center w-full max-w-3xl rounded-2xl border border-slate-100 shadow-md">
      <div className="card-body">
        <span className="lg:text-xl">お題：</span>
        <h1 className="card-title text-2xl lg:text-4xl">{theme}</h1>
      </div>
    </div>
  );
};

const DisplayNumberCard = ({ number }: { number: number }) => {
  return (
    <div className="card bg-base-100 flex items-center w-full max-w-3xl rounded-2xl border border-slate-100 shadow-md mt-2">
      <div className="card-body">
        <p className="lg:text-xl">
          あなたの数字は
          <span className="ml-6 text-5xl lg:text-7xl font-bold">{number}</span>
        </p>
      </div>
    </div>
  );
};

const AnswerForm = ({ roomId }: { roomId: string }) => {
  const [answer, setAnswer] = useState("");
  const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAnswer(value);
  };

  const onClickSendAnswer = () => {
    const data = { roomId, answer };
    socket.emit(SocketEvent.UPDATE_ANSWER, JSON.stringify(data));
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-3xl w-full mt-4">
      <input
        type="text"
        className="input input-bordered input-primary border-4 border-primary w-full"
        placeholder="回答のテキストを入力"
        onChange={onChangeAnswer}
      />
      <button
        className="btn btn-primary mt-2 lg:mt-0 lg:ml-3"
        onClick={onClickSendAnswer}
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
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
        
      </button>
    </div>
  );
};

const ResultLink = ({
  isHost,
  gameData,
  roomId,
}: {
  isHost: boolean;
  gameData: GameData[];
  roomId: string;
}) => {
  const onResultShow = () => {
    const data = { roomId, gameData };
    socket.emit(SocketEvent.REQ_RESULT, JSON.stringify(data));
  };

  if (!isHost) {
    return null;
  } else {
    return (
      <>
        <label
          htmlFor="result-modal"
          className="btn btn-secondary"
          onClick={() => onResultShow()}
        >
          並び替えを確定して結果発表！
        </label>
      </>
    );
  }
};

export default Game;
