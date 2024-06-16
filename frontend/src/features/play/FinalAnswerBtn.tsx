// interfaces
import { GameData } from "@/interfaces/interface";

// Utils
import { socket } from "@/utils/socket";

// Class
import SocketEvent from "@/class/socketEvents";

interface FinalAnswerBtnProps {
  isHost: boolean;
  gameData: GameData[];
  roomId: string;
}

const FinalAnswerBtn = ({ isHost, gameData, roomId }: FinalAnswerBtnProps) => {
  const onResultShow = () => {
    const data = { roomId, gameData };
    socket.emit(SocketEvent.REQ_RESULT, JSON.stringify(data));
  };

  if (!isHost) {
    return null;
  } else {
    return (
      <>
        <label
          htmlFor="result-modal"
          className="btn btn-secondary"
          onClick={() => onResultShow()}
        >
          並び替えを確定して結果発表！
        </label>
      </>
    );
  }
};

export default FinalAnswerBtn;
