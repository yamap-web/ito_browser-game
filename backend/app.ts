import type { Socket } from "socket.io";
import { io } from "./socket";
import getNumbers from "./controllers/eventController";

const port = 3000;

io.on("connection", (socket: Socket) => {
  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

io.listen(port);

console.log(getNumbers(10));
