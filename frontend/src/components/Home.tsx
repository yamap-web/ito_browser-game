import type { Dispatch, SetStateAction, ChangeEvent } from "react";
import { useState } from "react";
import { socket } from "../utils/socket";
import Footer from "./Footer";
import SocketEvent from "../class/socketEvents";

interface HomeProps {
  isHost: boolean;
  setIsHost: Dispatch<SetStateAction<boolean>>;
  roomId: string;
  setRoomId: Dispatch<SetStateAction<string>>;
}

const Home = ({ isHost, setIsHost, roomId, setRoomId }: HomeProps) => {
  return (
    <>
      <div className="flex flex-col flex-grow items-center justify-center">
        <h1 className="text-9xl font-bold tracking-wide">ito</h1>
        <p className="py-3 text-sm">
          言葉で当てる 1~100！価値観共有ゲーム - イト -
        </p>
        <EntryRoomForm setIsHost={setIsHost} setRoomId={setRoomId} />
        <InputNameModal isHost={isHost} setIsHost={setIsHost} roomId={roomId} />
      </div>
      <Footer />
    </>
  );
};

const EntryRoomForm = ({
  setIsHost,
  setRoomId,
}: {
  setIsHost: Dispatch<SetStateAction<boolean>>;
  setRoomId: Dispatch<SetStateAction<string>>;
}) => {
  const handleJoinBtnClick = () => {
    setIsHost(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRoomId(value);
  };

  return (
    <div className="mt-10">
      <div className="grid">
        <div>
          <input
            type="text"
            className="input"
            placeholder="Room ID (ex. 1234)"
            onChange={handleInputChange}
          />
          <label
            htmlFor="input-name-modal"
            className="btn btn-secondary ml-4"
            onClick={() => handleJoinBtnClick()}
          >
            Join Room!
          </label>
        </div>
      </div>
      <div className="divider">OR</div>
      <div className="grid">
        <label htmlFor="input-name-modal" className="btn btn-primary">
          Create New Room!
        </label>
      </div>
    </div>
  );
};

const InputNameModal = ({
  isHost,
  setIsHost,
  roomId,
}: {
  isHost: boolean;
  setIsHost: Dispatch<SetStateAction<boolean>>;
  roomId: string;
}) => {
  const [userName, setUserName] = useState("");
  const [validationMsg, setValidationMsg] = useState("");

  const handleCloseBtnClick = () => {
    setValidationMsg("");
    setIsHost(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserName(value);
  };

  const handleEntryBtnClick = () => {
    if (userName === "") {
      setValidationMsg("ユーザーネームを入力してください。");
      return;
    }

    if (isHost) {
      socket.emit(SocketEvent.REQ_CREATEROOM, userName);
    } else {
      const parameter = { userName, roomId };
      socket.emit(SocketEvent.REQ_JOIN, JSON.stringify(parameter));
    }
  };

  return (
    <>
      <input type="checkbox" id="input-name-modal" className="modal-toggle" />
      <div role="dialog" className="modal">
        <div className="modal-box">
          <label
            htmlFor="input-name-modal"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => handleCloseBtnClick()}
          >
            ✕
          </label>
          <h2 className="font-bold text-lg">ユーザーネームを登録</h2>
          <input
            type="text"
            className="input input-bordered mt-4 w-full"
            placeholder="User Name"
            onChange={handleInputChange}
            name="userName"
          />
          <div className="modal-action mt-4 flex items-center justify-between">
            <p className="text-sm text-error">{validationMsg}</p>
            {isHost ? (
              <button className="btn btn-primary" onClick={handleEntryBtnClick}>
                登録する
              </button>
            ) : (
              <button
                className="btn btn-secondary"
                onClick={handleEntryBtnClick}
              >
                登録する
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
