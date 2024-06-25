import { config } from "dotenv";
import { Server } from "socket.io";
config();

export const io = new Server({
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});
