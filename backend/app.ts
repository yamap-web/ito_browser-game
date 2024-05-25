import type { Socket } from "socket.io";
import { Server } from "socket.io";
import { config } from "dotenv";
config();

const port = 3000;

const io = new Server({
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

io.listen(port);
