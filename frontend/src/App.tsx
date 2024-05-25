import "./css/style.css";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { config } from "dotenv";
config();

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
      <h1 className="text-4xl mt-4 mx-4">Hello, World!</h1>
      <button className="btn btn-primary mt-4 mx-4">Button</button>
    </>
  );
};

export default App;
