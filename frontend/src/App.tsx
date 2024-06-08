import "./css/style.css";
import { useState, useEffect } from "react";
import { useSocketEvents } from "./hooks/useSocketEvents";
import { Routes, Route } from "react-router-dom";
import { socket } from "./utils/socket";
import Header from "./components/Header";
import Home from "./components/Home";
import Standby from "./components/Standby";
import Game from "./components/Game";
import NotFound from "./components/NotFound";

const App = () => {
  const [isHost, setIsHost] = useState<boolean>(true);

  useEffect(() => {
    socket.connect();
  }, []);

  const { gameData, roomId, setRoomId, theme, number } = useSocketEvents();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isHost={isHost}
              setIsHost={setIsHost}
              roomId={roomId}
              setRoomId={setRoomId}
            />
          }
        />
        <Route
          path="/standby"
          element={
            <Standby isHost={isHost} gameData={gameData} roomId={roomId} />
          }
        />
        <Route
          path="/play"
          element={
            <Game
              gameData={gameData}
              roomId={roomId}
              theme={theme}
              number={number}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
