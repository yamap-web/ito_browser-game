import { GameData } from "../interfaces/interface";

import HeadBlock from "./HeadBlock";

interface ResultProps {
  isHost: boolean;
  gameData: GameData[];
  result: boolean;
}

const Result = ({ isHost, gameData, result }: ResultProps) => {
  return (
    <>
      <HeadBlock title={result ? "ito | CLEAR!!!" : "ito | GAME OVER"} />
      <div className="flex flex-col flex-grow items-center justify-center container mx-auto mt-10 px-4">
        <DisplayResultCard result={result} />
        <NextGameLink isHost={isHost} />
        <ResultTable gameData={gameData} />
      </div>
    </>
  );
};

const DisplayResultCard = ({ result }: { result: boolean }) => {
  return (
    <div className="card bg-gradient-to-r from-primary to-secondary flex items-center w-full max-w-3xl rounded-2xl shadow-md">
      <div className="card-body">
        <span className="text-white">The Final Result is...</span>
        <h2 className="text-white text-center font-bold text-5xl">
          {result ? "CLEAR!!!" : "GAME OVER"}
        </h2>
        <p className="text-center text-white font-bold">
          {result
            ? "絆の強さが証明されましたね！"
            : "もっともっと仲良くなれますね！"}
        </p>
      </div>
    </div>
  );
};

const NextGameLink = ({ isHost }: { isHost: boolean }) => {
  if (!isHost) {
    return null;
  } else {
    return (
      <div className="flex gap-2 mt-4">
        <button className="btn btn-outline btn-primary">
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
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          もう一戦！
        </button>
        <button className="btn btn-outline btn-secondary">
          ゲームを終了する
        </button>
      </div>
    );
  }
};

const ResultTable = ({ gameData }: { gameData: GameData[] }) => {
  return (
    <div className="w-full lg:w-fit lg:min-w-[770px] overflow-x-auto border-2 border-zinc-100 rounded-3xl shadow-md mt-4">
      <table className="table">
        <thead>
          <tr className="bg-slate-200">
            <th>
              <span className="text-slate-500 text-lg badge badge-outline border-2 font-bold">
                1
              </span>
            </th>
            <th>Name</th>
            <th>Player's answer</th>
          </tr>
        </thead>
        <tbody>
          {[...gameData].map((_, index) => {
            return (
              <tr key={"record_" + index}>
                <th className="text-xl lg:text-3xl font-bold">
                  {gameData[index].number}
                </th>
                <td>{gameData[index].userName}</td>
                <td>{gameData[index].answer}</td>
              </tr>
            );
          })}
          <tr className="bg-slate-200">
            <th>
              <span className="text-slate-500 text-lg badge badge-outline border-2 font-bold">
                100
              </span>
            </th>
            <th></th>
            <th></th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Result;
