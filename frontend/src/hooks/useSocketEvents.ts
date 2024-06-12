import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";
import { GameData } from "../interfaces/interface";
import SocketEvents from "../class/socketEvents";

export const useSocketEvents = () => {
  const [gameData, setGameData] = useState<GameData[]>([]);
  const [roomId, setRoomId] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [number, setNumber] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [resultFlg, setResultFlg] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("RES_CREATEROOM", (data) => {
      console.log("RES_CREATEROOMを受信", data);
      
      setRoomId(data);
      navigate("/standby");
    });

    socket.on(SocketEvents.NOTIFY_GAMEDATA.constructor.name, (data) => {
      console.log("NOTIFY_GAMEDATAを受信", data);
      
      setGameData(JSON.parse(data));
    });

    socket.on(SocketEvents.RES_JOIN.constructor.name, (data) => {
      const RES_JOIN = SocketEvents.RES_JOIN.parseEventParameter(data);

      // エラーメッセージがない場合、待機画面へ
      if (RES_JOIN.errorMsg == "") {
        navigate("/standby");
        setErrorMsg("");
      } else {
        setErrorMsg(RES_JOIN.errorMsg);
      }
    });

    socket.on(SocketEvents.NOTIFY_THEME.constructor.name, (data) => {
      setTheme(data);
    });

    socket.on(SocketEvents.NOTIFY_NUMBER.constructor.name, (data) => {
      setNumber(data);
    });

    socket.on(SocketEvents.RES_START.constructor.name, (data) => {
      const RES_START = SocketEvents.RES_START.parseEventParameter(data);

      // エラーメッセージがない場合、ゲーム画面へ
      if (RES_START.errorMsg == "") {
        navigate("/play");
        setErrorMsg("");
      } else {
        setErrorMsg(RES_START.errorMsg);
      }
    });

    socket.on(SocketEvents.RES_RESULT.constructor.name, (data) => {
      const RES_RESULT = SocketEvents.RES_RESULT.parseEventParameter(data);
      setResultFlg(true);
      setResult(RES_RESULT.result);
    });
  }, []);

  return {
    gameData,
    setGameData,
    roomId,
    setRoomId,
    number,
    theme,
    errorMsg,
    setErrorMsg,
    resultFlg,
    result,
  };
};
