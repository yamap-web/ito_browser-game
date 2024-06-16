import { GameData } from "@/interfaces/interface";

import HeadBlock from "@/features/common/HeadBlock";
import { FinalResultCard, NextGameLink, ResultTable } from "@/features/play";

interface ResultProps {
  isHost: boolean;
  gameData: GameData[];
  roomId: string;
  result: boolean;
}

const Result = ({ isHost, gameData, roomId, result }: ResultProps) => {
  return (
    <>
      <HeadBlock title={result ? "ito | CLEAR!!!" : "ito | GAME OVER"} />
      <div className="flex flex-col flex-grow items-center justify-center container mx-auto mt-10 px-4">
        <FinalResultCard result={result} />
        <NextGameLink isHost={isHost} roomId={roomId} />
        <ResultTable gameData={gameData} />
      </div>
    </>
  );
};

export default Result;
