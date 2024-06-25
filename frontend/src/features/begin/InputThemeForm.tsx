import type { ChangeEvent, Dispatch, SetStateAction } from "react";

import { useState } from "react";

import SocketEvent from "@/class/socketEvents";
import { socket } from "@/utils/socket";

interface InputThemeFormProps {
  isHost: boolean;
  roomId: string;
  setErrorMsg: Dispatch<SetStateAction<string>>;
}

const InputThemeForm = ({
  isHost,
  roomId,
  setErrorMsg,
}: InputThemeFormProps) => {
  const [theme, setTheme] = useState<string>("");

  // お題の入力
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTheme(value);
  };

  // ゲーム開始ボタンを押した時の処理
  const handleStartBtnClick = () => {
    if (theme === "") {
      setErrorMsg("お題を入力してください。");
      return;
    }
    const parameter = { roomId, theme };
    socket.emit(SocketEvent.REQ_START, JSON.stringify(parameter));
  };

  if (isHost) {
    return (
      <div className="my-4 flex w-full max-w-3xl flex-col lg:flex-row">
        <input
          className="input input-bordered input-primary w-full border-4 border-primary"
          name="theme"
          placeholder="お題を入力"
          type="text"
          onChange={handleInputChange}
        />
        <button
          className="btn btn-primary mt-2 lg:ml-4 lg:mt-0"
          onClick={handleStartBtnClick}
        >
          ゲーム開始！
        </button>
      </div>
    );
  } else {
    return (
      <div
        aria-label="待機中"
        className="my-6 flex items-center justify-center"
      >
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-secondary border-t-transparent"></div>
        <p className="pl-4 text-secondary">ゲームの開始を待っています</p>
      </div>
    );
  }
};

export default InputThemeForm;
