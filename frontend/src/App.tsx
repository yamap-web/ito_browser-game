import "./css/style.css";
import { useEffect } from "react";
import { useSocketEvents } from "./hooks/useSocketEvents";
import { Routes, Route } from "react-router-dom";
import { socket } from "./utils/socket";
import Header from "./components/Header";
import Home from "./components/Home";
import Standby from "./components/Standby";
import Game from "./components/Game";
import NotFound from "./components/NotFound";

const App = () => {
  useEffect(() => {
    socket.connect();
  }, []);

  const { gameData } = useSocketEvents();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/standby" element={<Standby gameData={gameData} />} />
        <Route path="/play" element={<Game gameData={gameData} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
