import type { Socket } from "socket.io";
import { io } from "./socket";
import eventRcv from "./utils/eventRcv";

const port = 3000;

// 通信接続時処理
io.on("connection", (socket: Socket) => {
  console.log("User connected");

  // イベント受信時処理登録
  eventRcv(socket);
});

io.listen(port);
