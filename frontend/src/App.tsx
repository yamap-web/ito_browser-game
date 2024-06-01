import "./css/style.css";
import { useEffect } from "react";
import { socket } from "./utils/socket";
import Home from "./components/Home";

const App = () => {
  useEffect(() => {
    socket.connect();
  }, []);

  return (
    <>
      <Home />
    </>
  );
};

export default App;
