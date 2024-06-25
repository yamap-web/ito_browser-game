import type { ChangeEvent } from "react";

import { useState } from "react";

import SocketEvent from "@/class/socketEvents";
import { socket } from "@/utils/socket";

const AnswerForm = ({ roomId }: { roomId: string }) => {
  const [answer, setAnswer] = useState<string>("");

  // テキストの入力内容を取得
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAnswer(value);
  };

  const handleSendClick = () => {
    const data = { roomId, answer };
    socket.emit(SocketEvent.UPDATE_ANSWER, JSON.stringify(data));
  };

  return (
    <div className="mt-4 flex w-full max-w-3xl flex-col lg:flex-row">
      <input
        className="input input-bordered input-primary w-full border-4 border-primary"
        placeholder="回答のテキストを入力"
        type="text"
        onChange={handleInputChange}
      />
      <button
        className="btn btn-primary mt-2 lg:ml-3 lg:mt-0"
        onClick={handleSendClick}
      >
        <svg
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m4.5 12.75 6 6 9-13.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default AnswerForm;
