import type { Dispatch, SetStateAction } from "react";

import HeadBlock from "@/features/common/HeadBlock";
import {
  ThemeCard,
  NumberCard,
  AnswerForm,
  SortAnswerBoard,
  FinalAnswerBtn,
} from "@/features/play";
import { GameData } from "@/interfaces/interface";

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
          gameData={gameData}
          isHost={isHost}
          roomId={roomId}
          setGameData={setGameData}
        />
        <FinalAnswerBtn gameData={gameData} isHost={isHost} roomId={roomId} />
      </div>
    </>
  );
};

export default Game;
