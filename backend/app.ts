import { LogLevel } from "./class/LogClass";
import SocketEvent from "./class/SocketEvent";
import { io } from "./socket";
import eventRcv from "./utils/eventRcv";
import { outputEventLog } from "./utils/outputLog";

import type { Socket } from "socket.io";

const port = 3000;

// 通信接続時処理
io.on(SocketEvent.CONNECTION, (socket: Socket) => {
  outputEventLog(LogLevel.INFO, socket.id, SocketEvent.CONNECTION);

  // イベント受信時処理登録
  eventRcv(socket);
});

io.listen(port);
