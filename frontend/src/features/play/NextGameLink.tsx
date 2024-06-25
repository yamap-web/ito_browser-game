import SocketEvent from "@/class/socketEvents";
import { socket } from "@/utils/socket";

interface NextGameLinkProps {
  isHost: boolean;
  roomId: string;
}

const NextGameLink = ({ isHost, roomId }: NextGameLinkProps) => {
  // もう一戦ボタンを押したときの処理
  const handleNextClick = () => {
    const parameter = { roomId };
    socket.emit(SocketEvent.REQ_NEXTGAME, JSON.stringify(parameter));
  };

  // ゲームを終了ボタンを押したときの処理
  const handleQuitClick = () => {
    const parameter = { roomId };
    socket.emit(SocketEvent.REQ_CLOSEROOM, JSON.stringify(parameter));
  };

  if (!isHost) {
    return null;
  } else {
    return (
      <div className="mt-4 flex gap-2">
        <button
          className="btn btn-outline btn-primary"
          onClick={handleNextClick}
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
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          もう一戦！
        </button>
        <button
          className="btn btn-outline btn-secondary"
          onClick={handleQuitClick}
        >
          ゲームを終了する
        </button>
      </div>
    );
  }
};

export default NextGameLink;
