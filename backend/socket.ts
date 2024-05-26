import { Server } from "socket.io";
import { config } from "dotenv";
config();

export const io = new Server({
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});
