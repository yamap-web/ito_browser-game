import type { Socket } from "socket.io";
import { io } from "./socket";
import eventRcv from "./utils/eventRcv";
import SocketEvent from "./class/SocketEvent";
import { outputEventLog } from "./utils/outputLog";
import { LogLevel } from "./class/LogClass";

const port = 3000;

// 通信接続時処理
io.on(SocketEvent.CONNECTION, (socket: Socket) => {
  outputEventLog(LogLevel.INFO, socket.id, SocketEvent.CONNECTION);

  // イベント受信時処理登録
  eventRcv(socket);
});

io.listen(port);
