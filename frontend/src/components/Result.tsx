import { GameData } from "../interfaces/interface";

import HeadBlock from "./HeadBlock";

interface ResultProps {
  gameData: GameData[];
  result: boolean;
}

const Result = ({ gameData, result }: ResultProps) => {
  return (
    <>
      <HeadBlock title="ito | Result" />
      <div className="flex flex-col flex-grow items-center justify-center container mx-auto mt-10 px-4">
        <DisplayResultCard result={result} />
        <ResultTable gameData={gameData} />
      </div>
    </>
  );
};

const DisplayResultCard = ({ result }: { result: boolean }) => {
  return (
    <div className="card bg-gradient-to-r from-primary to-secondary flex items-center w-full max-w-3xl rounded-2xl shadow-md">
      <div className="card-body">
        <h2 className="text-white text-center font-bold text-5xl">
          {result ? "GAME CLEAR!!!" : "GAME OVER"}
        </h2>
      </div>
    </div>
  );
};

const ResultTable = ({ gameData }: { gameData: GameData[] }) => {
  return (
    <div className="w-full lg:w-fit lg:min-w-[770px] overflow-x-auto border-2 border-zinc-100 rounded-3xl shadow-md mt-4">
      <table className="table">
        <thead>
          <tr>
            <th>
              <span className="text-secondary text-lg badge badge-outline border-2 font-bold">
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
          <tr>
            <th>
              <span className="text-secondary text-lg badge badge-outline border-2 font-bold">
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
