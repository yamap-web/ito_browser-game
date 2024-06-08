import type { Socket } from "socket.io";
import dataAccess from "../models/dataAccessModel";
import {
  createRoomId,
  getNumbers,
  judgement,
} from "../controllers/eventController";
import { sendEvent, broadcast } from "../utils/eventSend";

const eventRcv = (socket: Socket) => {
  const access = new dataAccess();

  //#region イベント[disconnect]受信
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  //#endregion

  //#region イベント[REQ_CREATEROOM]受信
  socket.on("REQ_CREATEROOM", (data) => {
    // userName取得
    const userName = data;
    // ルームID取得
    const roomId = createRoomId();

    // ルーム作成
    access.createRoom(roomId, socket.id, userName);

    // ゲームデータ取得
    const gameData = access.getAllGameData(roomId);

    // イベント[NOTIFY_GAMEDATA]送信
    sendEvent(socket.id, "NOTIFY_GAMEDATA", JSON.stringify(gameData));

    // イベント[RES_CREATEROOM]送信
    sendEvent(socket.id, "RES_CREATEROOM", roomId);
  });
  //#endregion

  //#region イベント[REQ_JOIN]受信
  socket.on("REQ_JOIN", (data) => {
    // 受信パラメータ解析
    const parameter = JSON.parse(data);

    // ルームID取得
    const roomId = parameter.roomId;
    // ユーザーネーム取得
    const userName = parameter.userName;

    // 参加者数取得
    const numberOfMembers = access.getNumberOfMembers(roomId);
    if (numberOfMembers == 10) {
      const errorMsg = "参加上限に達しているため、参加できません。";
      // イベント[RES_JOIN]送信
      sendEvent(socket.id, "RES_JOIN", errorMsg);

      return;
    }

    // 参加者の登録
    access.setMember(roomId, socket.id, userName, false);

    // ゲームデータ取得
    const gameData = access.getAllGameData(roomId);

    // 参加者全員へ参加者の通知
    broadcast(roomId, "NOTIFY_GAMEDATA", JSON.stringify(gameData));

    // イベント[RES_JOIN]送信
    sendEvent(socket.id, "RES_JOIN");
  });
  //#endregion

  //#region イベント[REQ_START]受信
  socket.on("REQ_START", (data) => {
    // 受信パラメータ解析
    const parameter = JSON.parse(data);
    // roomId取得
    const roomId = parameter.roomId;
    // お題取得
    const theme = parameter.theme;

    // 参加者数取得
    const numberOfMembers = access.getNumberOfMembers(roomId);
    // 参加者数チェック（3人以上の場合、ゲーム開始）
    if (numberOfMembers >= 3) {
      // ランダムな数字生成
      const numbers = getNumbers(numberOfMembers);

      // 参加者にランダムな数字設定
      access.setNumber(roomId, numbers);

      // 参加者に必要なデータの通知
      const room = access.findRoom(roomId);
      if (room) {
        room.gameData.forEach((data) => {
          // socketId取得
          const socketId = data.getSocketId();
          // number取得
          const number = data.getNumber();

          // イベント[NOTIFY_NUMBER]送信
          sendEvent(socketId, "NOTIFY_NUMBER", String(number));
        });
      }

      // ゲームデータ取得
      const gameData = access.getAllGameData(roomId);

      // お題とゲームデータのブロードキャスト
      broadcast(roomId, "NOTIFY_THEME", theme);
      broadcast(roomId, "NOTIFY_GAMEDATA", JSON.stringify(gameData));
      broadcast(roomId, "RES_START");
    } else {
      // イベント[RES_START]送信（エラーメッセージあり）
      const errorMsg = "参加者数が不足しており、ゲームを開始できません。";
      sendEvent(socket.id, "RES_START", errorMsg);
    }
  });
  //#endregion

  //#region イベント[REQ_RESULT]受信
  socket.on("REQ_RESULT", (data) => {
    const gameData = JSON.parse(data);
    if (judgement(gameData)) {
      sendEvent(socket.id, "RES_RESULT", "TRUE");
    } else {
      sendEvent(socket.id, "RES_RESULT", "FALSE");
    }
  });
  //#endregion

  //#region イベント[UPDATE_GAMEDATA]受信
  socket.on("UPDATE_GAMEDATA", (data) => {
    console.log(socket.id);
    console.log("受信しました。");

    // 受信パラメータ解析
    const parameter = JSON.parse(data);
    // ルームID取得
    const roomId = parameter.roomId;
    // 解答取得
    const answer = parameter.answer;

    // 解答の設定
    access.setAnswer(roomId, socket.id, answer);

    // ゲームデータ取得
    const gameData = access.getAllGameData(roomId);

    // イベント[NOTIFY_GAMEDATA]送信
    broadcast(roomId, "NOTIFY_GAMEDATA", JSON.stringify(gameData));
  });
  //#endregion
};

export default eventRcv;
