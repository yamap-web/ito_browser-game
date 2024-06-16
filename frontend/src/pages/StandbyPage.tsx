// Types
import type { Dispatch, SetStateAction } from "react";

// Interfaces
import { GameData } from "@/interfaces/interface";

// Common components
import HeadBlock from "@/features/common/HeadBlock";

// Feature components
import {
  IdCard,
  PlayerTable,
  DescAccordion,
  InputThemeForm,
} from "@/features/begin";

interface StandbyProps {
  isHost: boolean;
  gameData: GameData[];
  roomId: string;
  setErrorMsg: Dispatch<SetStateAction<string>>;
}

const Standby = ({ isHost, gameData, roomId, setErrorMsg }: StandbyProps) => {
  return (
    <>
      <HeadBlock title="ito | On Standby Now..." />
      <div className="flex flex-col justify-center flex-grow container mx-auto mt-10 lg:mt-0 px-4">
        <IdCard isHost={isHost} roomId={roomId} />
        <div className="flex flex-col lg:flex-row items-center justify-center mb-10">
          <PlayerTable gameData={gameData} />
          <div className="max-w-2xl w-full mt-4 lg:mt-0 lg:ml-6">
            <DescAccordion />
            <InputThemeForm
              isHost={isHost}
              roomId={roomId}
              setErrorMsg={setErrorMsg}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Standby;
