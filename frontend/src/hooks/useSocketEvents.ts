import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";
import { GameData } from "../interfaces/interface";

export const useSocketEvents = () => {
  const [gameData, setGameData] = useState<GameData[]>([]);
  const [roomId, setRoomId] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [number, setNumber] = useState<number>(0);

  const navigate = useNavigate();

  socket.on("RES_CREATEROOM", (data) => {
    setRoomId(data);
    navigate("/standby");
  });

  socket.on("NOTIFY_GAMEDATA", (data) => {
    setGameData(JSON.parse(data));
  });

  socket.on("RES_JOIN", () => {
    navigate("/standby");
  });

  socket.on("NOTIFY_THEME", (data) => {
    setTheme(data);
    navigate("/play");
  });

  socket.on("NOTIFY_NUMBER", (data) => {
    setNumber(Number(data));
  });

  return { gameData, roomId, number, theme };
};
