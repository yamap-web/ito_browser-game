import { GameData } from "../interfaces/interface";
import DisplayAnswersSection from "./DisplayAnswersSection";

const Game = (props: {gameData: GameData[]}) => {
  return (
    <>
      <div className="flex flex-col flex-grow items-center justify-center container mx-auto px-4">
        <DisplayThemeCard />
        <DisplayNumberCard />
        <AnswerForm />
        <DisplayAnswersSection gameData={props.gameData} />
      </div>
    </>
  );
};

const DisplayThemeCard = () => {
  const theme = "好きなお寿司のネタ";

  return (
    <div className="card bg-base-100 flex items-center w-full max-w-3xl rounded-2xl border border-slate-100 shadow-md">
      <div className="card-body">
        <span className="lg:text-xl">お題：</span>
        <h1 className="card-title text-2xl lg:text-4xl">{theme}</h1>
      </div>
    </div>
  );
};

const DisplayNumberCard = () => {
  const number = 100;

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

const AnswerForm = () => {
  return (
    <div className="flex flex-col lg:flex-row max-w-3xl w-full mt-4">
      <input
        type="text"
        className="input input-bordered w-full"
        placeholder="回答のテキストを入力"
      />
      <button className="btn btn-primary mt-2 lg:mt-0 lg:ml-4">Answer!</button>
    </div>
  );
};

export default Game;
