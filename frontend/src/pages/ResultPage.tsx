// Interfaces
import { GameData } from "@/interfaces/interface";

// Common components
import HeadBlock from "@/features/common/HeadBlock";

// Feature components
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
      <div className="container mx-auto mt-8 flex flex-grow flex-col items-center justify-center px-4">
        <FinalResultCard result={result} />
        <NextGameLink isHost={isHost} roomId={roomId} />
        <ResultTable gameData={gameData} />
      </div>
    </>
  );
};

export default Result;
