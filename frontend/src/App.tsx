import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import ErrorAlert from "@/features/common/ErrorAlert";
import Header from "@/features/common/Header";
import { useSocketEvent } from "@/hooks/useSocketEvent";
import NotFound from "@/pages/404Page";
import Game from "@/pages/GamePage";
import Home from "@/pages/HomePage";
import Result from "@/pages/ResultPage";
import Standby from "@/pages/StandbyPage";
import { socket } from "@/utils/socket";

import "./styles/index.css";

const App = () => {
  const [isHost, setIsHost] = useState<boolean>(true);

  useEffect(() => {
    socket.connect();
  }, []);

  // カスタムフックuseSocketEventから必要なデータを取得
  const {
    gameData,
    setGameData,
    roomId,
    setRoomId,
    theme,
    number,
    errorMsg,
    setErrorMsg,
    result,
  } = useSocketEvent();

  return (
    <div className="static flex h-screen flex-col">
      <Header />
      <ErrorAlert errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
      <Routes>
        <Route
          element={
            <Home roomId={roomId} setIsHost={setIsHost} setRoomId={setRoomId} />
          }
          path="/"
        />
        <Route
          element={
            <Standby
              gameData={gameData}
              isHost={isHost}
              roomId={roomId}
              setErrorMsg={setErrorMsg}
            />
          }
          path="/standby"
        />
        <Route
          element={
            <Game
              gameData={gameData}
              isHost={isHost}
              number={number}
              roomId={roomId}
              setGameData={setGameData}
              theme={theme}
            />
          }
          path="/play"
        />
        <Route
          element={
            <Result
              gameData={gameData}
              isHost={isHost}
              result={result}
              roomId={roomId}
            />
          }
          path="/result"
        />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </div>
  );
};

export default App;
