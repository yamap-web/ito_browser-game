import "./css/style.css";

import { useState, useEffect } from "react";
import { useSocketEvents } from "./hooks/useSocketEvents";
import { useAudio } from "./hooks/useAudio";
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

  // カスタムフックuseSocketEventsから必要なデータを取得
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
  } = useSocketEvents();

  // カスタムフックuseAudioから必要なデータを取得
  const audioUrl: string = "./cocktail_recipe.mp3";
  const [playing, playToggle] = useAudio(audioUrl);

  return (
    <div className="flex flex-col h-screen static">
      <Header playing={playing} playToggle={playToggle} />
      <ErrorAlert errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
      <Routes>
        <Route
          path="/"
          element={
            <Home setIsHost={setIsHost} roomId={roomId} setRoomId={setRoomId} />
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
            />
          }
        />
        <Route
          path="/result"
          element={
            <Result
              isHost={isHost}
              gameData={gameData}
              roomId={roomId}
              result={result}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
