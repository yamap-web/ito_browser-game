import { io } from "socket.io-client";

const serverUrl = process.env.SERVER_URL;

if (!serverUrl) {
  throw new Error("SERVER_URL is not defined in the environment variables.");
}

export const socket = io(serverUrl, {
  autoConnect: false,
});
