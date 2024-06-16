// Types
import type { Dispatch, SetStateAction, ChangeEvent } from "react";

// External packages
import { useState } from "react";

// Utils
import { socket } from "@/utils/socket";

// Class
import SocketEvent from "@/class/socketEvents";

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
    <div className="max-w-xs">
      <div className="w-full mt-8">
        <h2 className="font-bold mb-2">STEP 1</h2>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="ユーザーネーム"
          onChange={handleInputNameChange}
          name="userName"
          autoFocus
        />
      </div>
      <div className="mt-6">
        <h2 className="font-bold mb-2">STEP 2</h2>
        <div className="grid">
          <div>
            <input
              type="text"
              className="input input-bordered"
              placeholder="ルームID (ex. 1234)"
              onChange={handleInputIdChange}
            />
            <button
              className="btn btn-secondary ml-3"
              onClick={() => handleEntryBtnClick(false)}
            >
              参加する！
            </button>
          </div>
        </div>
        <div className="divider">OR</div>
        <div className="grid">
          <button
            className="btn btn-primary"
            onClick={() => handleEntryBtnClick(true)}
          >
            新しいルームを作成する！
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryForm;
