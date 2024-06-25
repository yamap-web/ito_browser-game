import SocketEvent from "@/class/socketEvents";
import { GameData } from "@/interfaces/interface";
import { socket } from "@/utils/socket";

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
          className="btn btn-secondary"
          htmlFor="result-modal"
          onClick={() => onResultShow()}
        >
          並び替えを確定して結果発表！
        </label>
      </>
    );
  }
};

export default FinalAnswerBtn;
