import "./css/style.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { socket } from "./utils/socket";
import Home from "./components/Home";
import Game from "./components/Game";

const App = () => {
  useEffect(() => {
    socket.connect();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Game />} />
      </Routes>
    </>
  );
};

export default App;
