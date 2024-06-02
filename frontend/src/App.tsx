import "./css/style.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { socket } from "./utils/socket";
import Header from "./components/Header";
import Home from "./components/Home";
import Standby from "./components/Standby";
import Game from "./components/Game";

const App = () => {
  useEffect(() => {
    socket.connect();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/standby" element={<Standby />} />
        <Route path="/play" element={<Game />} />
      </Routes>
    </div>
  );
};

export default App;
