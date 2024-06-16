// Types
import type { ChangeEvent } from "react";

// External packages
import { useState } from "react";

// Utils
import { socket } from "@/utils/socket";

// Class
import SocketEvent from "@/class/socketEvents";

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
    <div className="flex flex-col lg:flex-row max-w-3xl w-full mt-4">
      <input
        type="text"
        className="input input-bordered input-primary border-4 border-primary w-full"
        placeholder="回答のテキストを入力"
        onChange={handleInputChange}
      />
      <button
        className="btn btn-primary mt-2 lg:mt-0 lg:ml-3"
        onClick={handleSendClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default AnswerForm;
