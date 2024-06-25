import type { Dispatch, SetStateAction } from "react";

import {
  IdCard,
  PlayerTable,
  DescAccordion,
  InputThemeForm,
} from "@/features/begin";
import HeadBlock from "@/features/common/HeadBlock";
import { GameData } from "@/interfaces/interface";

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
      <div className="container mx-auto mt-10 flex flex-grow flex-col justify-center px-4 lg:mt-0">
        <IdCard isHost={isHost} roomId={roomId} />
        <div className="mb-10 flex flex-col items-center justify-center lg:flex-row">
          <PlayerTable gameData={gameData} />
          <div className="mt-4 w-full max-w-2xl lg:ml-6 lg:mt-0">
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
