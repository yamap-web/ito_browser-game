import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";
import { GameData } from "../interfaces/interface";

export const useSocketEvents = () => {
  const [gameData, setGameData] = useState<GameData[]>([]);
  const [roomId, setRoomId] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [number, setNumber] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("RES_CREATEROOM", (data) => {
      setRoomId(data);
      navigate("/standby");
    });

    socket.on("NOTIFY_GAMEDATA", (data) => {
      setGameData(JSON.parse(data));
    });

    socket.on("RES_JOIN", (data) => {
      const errorMsg = data;

      // エラーメッセージがない場合、待機画面へ
      if (errorMsg == "") {
        navigate("/standby");
        setErrorMsg("");
      } else {
        setErrorMsg(errorMsg);
      }
    });

    socket.on("NOTIFY_THEME", (data) => {
      setTheme(data);
    });

    socket.on("NOTIFY_NUMBER", (data) => {
      setNumber(Number(data));
    });

    socket.on("RES_START", (data) => {
      const errorMsg = data;

      // エラーメッセージがない場合、ゲーム画面へ
      if (errorMsg == "") {
        navigate("/play");
        setErrorMsg("");
      } else {
        setErrorMsg(errorMsg);
      }
    });
  }, []);

  return { gameData, roomId, setRoomId, number, theme, errorMsg, setErrorMsg };
};
