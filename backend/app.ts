import { createServer } from "http";

import cors from "cors";
import express from "express";

import { LogLevel } from "./class/LogClass";
import SocketEvent from "./class/SocketEvent";
import { io } from "./socket";
import eventRcv from "./utils/eventRcv";
import { outputEventLog } from "./utils/outputLog";

import type { Socket } from "socket.io";

express().use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
const port = 3000;

// HTTPサーバーを作成
const httpServer = createServer((req, res) => {
  // ルートパスへのアクセス時の処理
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ito server is running");
  }
});

// ioインスタンスにHTTPサーバーを関連付け
io.attach(httpServer);

// 通信接続時処理
io.on(SocketEvent.CONNECTION, (socket: Socket) => {
  outputEventLog(LogLevel.INFO, socket.id, SocketEvent.CONNECTION);

  // イベント受信時処理登録
  eventRcv(socket);
});

httpServer.listen(port);
