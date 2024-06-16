import { GameData } from "@/interfaces/interface";

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

export default ResultTable;
