import type { Dispatch, SetStateAction, ChangeEvent } from "react";

import { useState } from "react";

import SocketEvent from "@/class/socketEvents";
import { socket } from "@/utils/socket";

interface EntryFormProps {
  setIsHost: Dispatch<SetStateAction<boolean>>;
  roomId: string;
  setRoomId: Dispatch<SetStateAction<string>>;
}

const EntryForm = ({ setIsHost, roomId, setRoomId }: EntryFormProps) => {
  const [userName, setUserName] = useState<string>("");

  // ユーザーネームの入力値を取得
  const handleInputNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserName(value);
  };

  // ルームIDの入力値を取得
  const handleInputIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRoomId(value);
  };

  // ホストか参加者かに応じたイベントを送信
  const handleEntryBtnClick = (isHost: boolean) => {
    if (isHost) {
      setIsHost(true);
      const parameter = { userName };
      socket.emit(SocketEvent.REQ_CREATEROOM, JSON.stringify(parameter));
    } else {
      setIsHost(false);
      const parameter = { userName, roomId };
      socket.emit(SocketEvent.REQ_JOIN, JSON.stringify(parameter));
    }
  };

  return (
    <div className="mt-4 grid max-w-xs grid-rows-6">
      <h2 className="my-auto pt-2 font-bold">STEP 1</h2>
      <input
        autoFocus
        className="input input-bordered"
        name="userName"
        placeholder="ユーザーネーム"
        type="text"
        onChange={handleInputNameChange}
      />
      <h2 className="my-auto pt-2 font-bold">STEP 2</h2>
      <div className="grid grid-cols-5 gap-2">
        <input
          className="input input-bordered col-span-3"
          placeholder="ルームID (ex. 1234)"
          type="text"
          onChange={handleInputIdChange}
        />

        <button
          className="btn btn-secondary col-span-2"
          onClick={() => handleEntryBtnClick(false)}
        >
          参加する！
        </button>
      </div>
      <div className="divider">OR</div>
      <button
        className="btn btn-primary"
        onClick={() => handleEntryBtnClick(true)}
      >
        新しいルームを作成する！
      </button>
    </div>
  );
};

export default EntryForm;
