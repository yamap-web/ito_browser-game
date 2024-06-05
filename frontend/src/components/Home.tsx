import type { Dispatch, SetStateAction, ChangeEvent } from "react";
import { useState } from "react";
import { socket } from "../utils/socket";
import Footer from "./Footer";

const Home = (props: {
  isHost: boolean;
  setIsHost: Dispatch<SetStateAction<boolean>>;
}) => {
  const [roomId, setRoomId] = useState("");

  return (
    <>
      <div className="flex flex-col flex-grow items-center justify-center">
        <h1 className="text-9xl font-bold tracking-wide">ito</h1>
        <p className="py-3 text-sm">
          言葉で当てる 1~100！価値観共有ゲーム - イト -
        </p>
        <EntryRoomForm setIsHost={props.setIsHost} setRoomId={setRoomId} />
        <InputNameModal isHost={props.isHost} roomId={roomId} />
      </div>
      <Footer />
    </>
  );
};

const EntryRoomForm = (props: {
  setIsHost: Dispatch<SetStateAction<boolean>>;
  setRoomId: Dispatch<SetStateAction<string>>;
}) => {
  // modalを開いたのがホストなのか判定、それによって送信する内容を変更
  // 初期値はtrueでホストの送信、falseでゲストの送信(id)

  const openModal = () => {
    const modalElement = document.getElementById(
      "input-name-modal"
    ) as HTMLDialogElement;
    if (modalElement) {
      modalElement.showModal();
    }
  };

  const onClickJoin = () => {
    props.setIsHost(false);
    openModal();
  };

  const onChangeRoomIdForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    props.setRoomId(value);
  };

  return (
    <div className="mt-10">
      <div className="grid">
        <div>
          <input
            type="text"
            className="input"
            placeholder="Room ID (ex. 1234)"
            onChange={onChangeRoomIdForm}
          />
          <button
            className="btn btn-primary ml-4"
            onClick={() => onClickJoin()}
          >
            Join Room!
          </button>
        </div>
      </div>
      <div className="divider">OR</div>
      <div className="grid">
        <button className="btn btn-primary" onClick={() => openModal()}>
          Create New Room!
        </button>
      </div>
    </div>
  );
};

const InputNameModal = (props: { isHost: boolean; roomId: string }) => {
  const [userName, setUserName] = useState("");

  const onClickAdd = () => {
    if (props.isHost) {
      socket.emit("REQ_CREATEROOM", userName);
    } else {
      const parameter = {
        userName,
        roomId: props.roomId,
      };
      socket.emit("REQ_JOIN", JSON.stringify(parameter));
    }
  };

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserName(value);
  };

  return (
    <>
      <dialog id="input-name-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h2 className="font-bold text-lg">ユーザーネームを登録</h2>
          <input
            type="text"
            className="input input-bordered mt-4 w-full"
            placeholder="User Name"
            onChange={onChangeUserName}
            name="userName"
          />
          <div className="modal-action mt-4">
            <button className="btn" onClick={onClickAdd}>
              登録する
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Home;
