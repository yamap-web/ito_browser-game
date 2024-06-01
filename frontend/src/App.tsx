import "./css/style.css";
import { useEffect } from "react";
import { io } from "socket.io-client";
import Home from "./components/Home";

const serverUrl = process.env.SERVER_URL;

if (!serverUrl) {
  throw new Error("SERVER_URL is not defined in the environment variables.");
}

export const socket = io(serverUrl, {
  autoConnect: false,
});

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
