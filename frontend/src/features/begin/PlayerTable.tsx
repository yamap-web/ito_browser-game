import { GameData } from "@/interfaces/interface";

const PlayerTable = ({ gameData }: { gameData: GameData[] }) => {
  const maxValue: number = 10;

  return (
    <div className="w-full max-w-sm">
      <PlayerStat gameData={gameData} maxValue={maxValue} />
      <PlayerList gameData={gameData} maxValue={maxValue} />
    </div>
  );
};

const PlayerStat = ({
  gameData,
  maxValue,
}: {
  gameData: GameData[];
  maxValue: number;
}) => {
  return (
    <div className="stat text-center">
      <div className="stat-title">Player</div>
      <div className="stat-value">{`${gameData.length} / ${maxValue}`}</div>
    </div>
  );
};

const PlayerList = ({
  gameData,
  maxValue,
}: {
  gameData: GameData[];
  maxValue: number;
}) => {
  return (
    <>
      <div className="overflow-x-auto rounded-3xl border-2 border-zinc-100 shadow-md">
        <table className="table">
          <thead>
            <tr>
              <th className=""></th>
              <th className="w-full">Name</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(maxValue)].map((_, index) => {
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

export default PlayerTable;
