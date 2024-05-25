import { useEffect } from "react";
import "./css/style.css";

import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {
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
