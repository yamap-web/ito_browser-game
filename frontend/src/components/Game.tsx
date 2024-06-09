import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { GameData } from "../interfaces/interface";
import DisplayAnswersSection from "./DisplayAnswersSection";
import { socket } from "../utils/socket";

interface GameProps {
  isHost: boolean;
  gameData: GameData[];
  setGameData: Dispatch<SetStateAction<GameData[]>>;
  roomId: string;
  theme: string;
  number: number;
  result: boolean;
}

const Game = ({
  isHost,
  gameData,
  setGameData,
  roomId,
  theme,
  number,
  result,
}: GameProps) => {
  // test
  const [resultFlg, setResultFlg] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col flex-grow items-center justify-center container mx-auto px-4">
        <DisplayThemeCard theme={theme} />
        <DisplayNumberCard number={number} />
        <AnswerForm roomId={roomId} />
        <DisplayAnswersSection
          gameData={gameData}
          setGameData={setGameData}
          roomId={roomId}
          resultFlg={resultFlg}
        />
        <DisplayResultSection
          isHost={isHost}
          gameData={gameData}
          setResultFlg={setResultFlg}
        />
        <ResultModal resultFlg={resultFlg} result={result} />
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
    const data = {
      roomId,
      answer,
    };

    socket.emit("UPDATE_ANSWER", JSON.stringify(data));
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
        className="btn btn-primary mt-2 lg:mt-0 lg:ml-4"
        onClick={onClickSendAnswer}
      >
        Answer!
      </button>
    </div>
  );
};

const DisplayResultSection = ({
  isHost,
  gameData,
  setResultFlg,
}: {
  isHost: boolean;
  gameData: GameData[];
  setResultFlg: Dispatch<SetStateAction<boolean>>;
}) => {
  // const onModalOpen = () => {
  //   const modalElement = document.getElementById(
  //     "result-modal"
  //   ) as HTMLDialogElement;
  //   if (modalElement) {
  //     modalElement.showModal();
  //   }
  // };

  const onResultShow = () => {
    const data = {
      gameData,
    };

    socket.emit("REQ_RESULT", JSON.stringify(data));
    setResultFlg(true);
    // onModalOpen();
  };

  if (!isHost) {
    return null;
  }
  return (
    <>
      <button className="btn btn-secondary" onClick={() => onResultShow()}>
        Show Result!
      </button>
    </>
  );
};

const ResultModal = ({
  resultFlg,
  result,
}: {
  resultFlg: boolean;
  result: boolean;
}) => {


  if (!resultFlg) {
    return null;
  }
  return (
    <>
      <p>{result ? "GAME CLEAR!!!" : "GAME OVER"}</p>
    </>
  );
};

export default Game;
