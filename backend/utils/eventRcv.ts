import type { Socket } from "socket.io";
import { io } from "../socket";
import dataAccess from "../models/dataAccessModel";
import { getNumbers } from "../controllers/eventController";

/**
 * Todo
 * ・ルームID生成処理の追加
 * ・未実装イベント受信処理の追加
 */

const eventRcv = (socket: Socket) => {
  const access = new dataAccess();

  //#region イベント[disconnect]受信
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  //#endregion

  //#region イベント[REQ_CREATEROOM]受信
  socket.on("REQ_CREATEROOM", (msg) => {
    // userName取得
    const userName = msg;

    // ルームID取得
    const roomId = "00001";

    // ルーム作成
    access.createRoom(roomId, socket.id, userName);

    // イベント[RES_CREATEROOM]送信
    io.to(socket.id).emit("RES_CREATEROOM");

    console.log("イベント[REQ_CREATEROOM]受信");
    console.log(access.findRoom(roomId));
  });
  //#endregion

  //#region イベント[REQ_JOIN]受信
  socket.on("REQ_JOIN", (msg) => {
    // 受信パラメータ解析
    const parameter = JSON.parse(msg);

    // ルームID取得
    const roomId = parameter.roomId;
    // ユーザーネーム取得
    const userName = parameter.userName;

    // 参加者の登録
    access.setMember(roomId, socket.id, userName, false);

    const room = access.findRoom(roomId);
    if (room) {
      room.gameData.forEach((data) => {
        // socketId取得
        const socketId = data.getSocketId();

        // ゲームデータ取得
        const gameData = access.getAllGameData(roomId);

        // イベント[NOTIFY_GAMEDATA]送信
        io.to(socketId).emit("NOTIFY_GAMEDATA", JSON.stringify(gameData));
      });
    }

    // イベント[RES_JOIN]送信
    io.to(socket.id).emit("RES_JOIN");

    console.log(access.findRoom(roomId));
  });
  //#endregion

  //#region イベント[REQ_START]受信
  socket.on("REQ_START", (msg) => {
    // roomId取得
    const parameter = JSON.parse(msg);

    // roomId取得
    const roomId = parameter.roomId;

    // お題取得
    const theme = parameter.theme;

    // 参加者数取得
    const numberOfMembers = access.getNumberOfMembers(roomId);

    // ランダムな数字生成
    const numbers = getNumbers(numberOfMembers);

    // 参加者にランダムな数字設定
    access.setNumber(roomId, numbers);

    // 参加者にランダムな数字通知
    const room = access.findRoom(roomId);
    if (room) {
      room.gameData.forEach((data) => {
        // socketId取得
        const socketId = data.getSocketId();

        // number取得
        const number = data.getNumber();

        // イベント[NOTIFY_NUMBER]送信
        io.to(socketId).emit("NOTIFY_NUMBER", String(number));

        // イベント[NOTIFY_THEME]送信
        io.to(socketId).emit("NOTIFY_THEME", theme);

        // ゲームデータ取得
        const gameData = access.getAllGameData(roomId);

        // イベント[NOTIFY_GAMEDATA]送信
        io.to(socketId).emit("NOTIFY_GAMEDATA", JSON.stringify(gameData));
      });
    }
  });
  //#endregion
};

export default eventRcv;
