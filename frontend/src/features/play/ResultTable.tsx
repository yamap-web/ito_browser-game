import { GameData } from "@/interfaces/interface";

const ResultTable = ({ gameData }: { gameData: GameData[] }) => {
  return (
    <div className="mt-4 w-full overflow-x-auto rounded-3xl border-2 border-zinc-100 shadow-md lg:w-fit lg:min-w-[770px]">
      <table className="table">
        <thead>
          <tr className="bg-slate-200">
            <th>
              <span className="badge badge-outline border-2 text-lg font-bold text-slate-500">
                1
              </span>
            </th>
            <th>Name</th>
            <th>Player&rsquo;s answer</th>
          </tr>
        </thead>
        <tbody>
          {[...gameData].map((_, index) => {
            return (
              <tr key={"record_" + index}>
                <th className="text-xl font-bold lg:text-3xl">
                  {gameData[index].number}
                </th>
                <td>{gameData[index].userName}</td>
                <td>{gameData[index].answer}</td>
              </tr>
            );
          })}
          <tr className="bg-slate-200">
            <th>
              <span className="badge badge-outline border-2 text-lg font-bold text-slate-500">
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
