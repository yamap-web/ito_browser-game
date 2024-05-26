import type { Socket } from "socket.io";
import { io } from "./socket";

const port = 3000;

io.on("connection", (socket: Socket) => {
  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

io.listen(port);
