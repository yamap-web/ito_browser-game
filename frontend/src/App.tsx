import "./css/style.css";

import { useState, useEffect } from "react";
import { useSocketEvents } from "./hooks/useSocketEvents";
import { Routes, Route } from "react-router-dom";
import { socket } from "./utils/socket";

import Header from "./components/Header";
import ErrorAlert from "./components/ErrorAlert";
import Home from "./components/Home";
import Standby from "./components/Standby";
import Game from "./components/Game";
import Result from "./components/Result";
import NotFound from "./components/NotFound";

const App = () => {
  const [isHost, setIsHost] = useState<boolean>(true);

  useEffect(() => {
    socket.connect();
  }, []);

  const {
    gameData,
    setGameData,
    roomId,
    setRoomId,
    theme,
    number,
    errorMsg,
    setErrorMsg,
    resultFlg,
    result,
  } = useSocketEvents();

  return (
    <div className="flex flex-col h-screen static">
      <Header />
      <ErrorAlert errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
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
            <Standby
              isHost={isHost}
              gameData={gameData}
              roomId={roomId}
              setErrorMsg={setErrorMsg}
            />
          }
        />
        <Route
          path="/play"
          element={
            <Game
              isHost={isHost}
              gameData={gameData}
              setGameData={setGameData}
              roomId={roomId}
              theme={theme}
              number={number}
              resultFlg={resultFlg}
              result={result}
            />
          }
        />
        <Route path="/result" element={<Result />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
