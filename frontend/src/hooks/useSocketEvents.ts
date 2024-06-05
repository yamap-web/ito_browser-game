import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";
import { GameData } from "../interfaces/interface";

export const useSocketEvents = () => {
  const [gameData, setGameData] = useState<GameData[]>([]);
  const [roomId, setRoomId] = useState<string>("");

  const navigate = useNavigate();

  socket.on("RES_CREATEROOM", (data) => {
    setRoomId(data);
    navigate("/standby");
  });

  socket.on("NOTIFY_GAMEDATA", (data) => {
    setGameData(JSON.parse(data));
  });

  socket.on("RES_JOIN", (data) => {
    console.log(data);
    navigate("/standby");
  });

  return { gameData, roomId };
};
