// Types
import type { Dispatch, SetStateAction } from "react";

// Interfaces
import { GameData } from "@/interfaces/interface";

// Common components
import HeadBlock from "@/features/common/HeadBlock";

// Feature components
import {
  ThemeCard,
  NumberCard,
  AnswerForm,
  SortAnswerBoard,
  FinalAnswerBtn,
} from "@/features/play";

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
      <div className="container mx-auto flex flex-grow flex-col items-center justify-center px-4">
        <ThemeCard theme={theme} />
        <NumberCard number={number} />
        <AnswerForm roomId={roomId} />
        <SortAnswerBoard
          isHost={isHost}
          gameData={gameData}
          setGameData={setGameData}
          roomId={roomId}
        />
        <FinalAnswerBtn isHost={isHost} gameData={gameData} roomId={roomId} />
      </div>
    </>
  );
};

export default Game;
