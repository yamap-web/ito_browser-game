import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useState } from "react";

import { socket } from "@/utils/socket";
import SocketEvent from "@/class/socketEvents";

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
      <div className="flex flex-col lg:flex-row max-w-3xl w-full my-4">
        <input
          type="text"
          className="input input-bordered input-primary border-4 border-primary w-full"
          placeholder="お題を入力"
          onChange={handleInputChange}
          name="theme"
        />
        <button
          className="btn btn-primary mt-2 lg:mt-0 lg:ml-4"
          onClick={handleStartBtnClick}
        >
          ゲーム開始！
        </button>
      </div>
    );
  } else {
    return (
      <div
        className="flex items-center justify-center my-6"
        aria-label="待機中"
      >
        <div className="animate-spin h-10 w-10 border-4 border-secondary rounded-full border-t-transparent"></div>
        <p className="text-secondary pl-4">ゲームの開始を待っています</p>
      </div>
    );
  }
};

export default InputThemeForm;
