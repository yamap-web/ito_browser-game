// External packages
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Custom hooks
import { useSocketEvent } from "@/hooks/useSocketEvent";
import { useAudio } from "@/hooks/useAudio";

// Utils
import { socket } from "@/utils/socket";

// Common components
import Header from "@/features/common/Header";
import ErrorAlert from "@/features/common/ErrorAlert";

// Page components
import Home from "@/pages/HomePage";
import Standby from "@/pages/StandbyPage";
import Game from "@/pages/GamePage";
import Result from "@/pages/ResultPage";
import NotFound from "@/pages/404Page";

// Styles
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
