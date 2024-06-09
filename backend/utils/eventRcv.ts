import type { Socket } from "socket.io";
import dataAccess from "../models/dataAccessModel";
import {
  createRoomId,
  getNumbers,
  judgement,
} from "../controllers/eventController";
import { sendEvent, broadcast } from "../utils/eventSend";
import SocketEvent from "../class/SocketEvent";
import { outputEventLog } from "../utils/outputLog";
import { LogLevel } from "../class/LogClass";

const eventRcv = (socket: Socket) => {
  const access = new dataAccess();

  //#region イベント[disconnect]受信
  socket.on(SocketEvent.DISCONNECT, () => {
    outputEventLog(LogLevel.INFO, socket.id, SocketEvent.DISCONNECT);
  });
  //#endregion

  //#region イベント[REQ_CREATEROOM]受信
  socket.on(SocketEvent.REQ_CREATEROOM.constructor.name, (data) => {
    outputEventLog(
      LogLevel.INFO,
      socket.id,
      SocketEvent.REQ_CREATEROOM.constructor.name
    );

    // 受信パラメータ取得(userName)
    const REQ_CREATEROOM = SocketEvent.REQ_CREATEROOM.parseEventParameter(data);

    // ルームID取得
    const roomId = createRoomId();

    // ルーム作成
    access.createRoom(roomId, socket.id, REQ_CREATEROOM.userName);

    // ゲームデータ取得
    const gameData = access.getAllGameData(roomId);

    // イベント[NOTIFY_GAMEDATA]送信
    sendEvent(socket.id, SocketEvent.NOTIFY_GAMEDATA, JSON.stringify(gameData));

    // イベント[RES_CREATEROOM]送信
    sendEvent(socket.id, SocketEvent.RES_CREATEROOM, roomId);
  });
  //#endregion

  //#region イベント[REQ_JOIN]受信
  socket.on(SocketEvent.REQ_JOIN.constructor.name, (data) => {
    outputEventLog(
      LogLevel.INFO,
      socket.id,
      SocketEvent.REQ_JOIN.constructor.name
    );

    // 受信パラメータ取得(userName, roomId)
    const REQ_JOIN = SocketEvent.REQ_JOIN.parseEventParameter(data);

    // 参加者数取得
    const numberOfMembers = access.getNumberOfMembers(REQ_JOIN.roomId);
    if (numberOfMembers == 10) {
      const errorMsg = "参加上限に達しているため、参加できません。";
      // イベント[RES_JOIN]送信
      sendEvent(socket.id, SocketEvent.RES_JOIN, errorMsg);

      return;
    }

    // 参加者の登録
    access.setMember(REQ_JOIN.roomId, socket.id, REQ_JOIN.userName, false);

    // ゲームデータ取得
    const gameData = access.getAllGameData(REQ_JOIN.roomId);

    // 参加者全員へ参加者の通知
    broadcast(
      REQ_JOIN.roomId,
      SocketEvent.NOTIFY_GAMEDATA,
      JSON.stringify(gameData)
    );

    // イベント[RES_JOIN]送信
    sendEvent(socket.id, SocketEvent.RES_JOIN);
  });
  //#endregion

  //#region イベント[REQ_START]受信
  socket.on(SocketEvent.REQ_START.constructor.name, (data) => {
    outputEventLog(
      LogLevel.INFO,
      socket.id,
      SocketEvent.REQ_START.constructor.name
    );

    // 受信パラメータ取得(roomId, theme)
    const REQ_START = SocketEvent.REQ_START.parseEventParameter(data);

    // 参加者数取得
    const numberOfMembers = access.getNumberOfMembers(REQ_START.roomId);
    // 参加者数チェック（3人以上の場合、ゲーム開始）
    if (numberOfMembers >= 3) {
      // ランダムな数字生成
      const numbers = getNumbers(numberOfMembers);

      // 参加者にランダムな数字設定
      access.setNumber(REQ_START.roomId, numbers);

      // 参加者に必要なデータの通知
      const room = access.findRoom(REQ_START.roomId);
      if (room) {
        room.gameData.forEach((data) => {
          // socketId取得
          const socketId = data.getSocketId();
          // number取得
          const number = data.getNumber();

          // イベント[NOTIFY_NUMBER]送信
          sendEvent(socketId, SocketEvent.NOTIFY_NUMBER, String(number));
        });
      }

      // ゲームデータ取得
      const gameData = access.getAllGameData(REQ_START.roomId);

      // お題とゲームデータのブロードキャスト
      broadcast(REQ_START.roomId, SocketEvent.NOTIFY_THEME, REQ_START.theme);
      broadcast(
        REQ_START.roomId,
        SocketEvent.NOTIFY_GAMEDATA,
        JSON.stringify(gameData)
      );
      broadcast(REQ_START.roomId, SocketEvent.RES_START);
    } else {
      // イベント[RES_START]送信（エラーメッセージあり）
      const errorMsg = "参加者数が不足しており、ゲームを開始できません。";
      sendEvent(socket.id, SocketEvent.RES_START, errorMsg);
    }
  });
  //#endregion

  //#region イベント[REQ_RESULT]受信
  socket.on(SocketEvent.REQ_RESULT.constructor.name, (data) => {
    outputEventLog(
      LogLevel.INFO,
      socket.id,
      SocketEvent.REQ_RESULT.constructor.name
    );

    // 受信パラメータ取得(gameData)
    const REQ_RESULT = SocketEvent.REQ_RESULT.parseEventParameter(data);

    // gameData取得
    const currentGameData = access.getAllGameData(REQ_RESULT.roomId, true);

    // 結果判定
    if (judgement(currentGameData)) {
      broadcast(REQ_RESULT.roomId, SocketEvent.RES_RESULT, "TRUE");
    } else {
      broadcast(REQ_RESULT.roomId, SocketEvent.RES_RESULT, "FALSE");
    }
  });
  //#endregion

  //#region イベント[UPDATE_ANSWER]受信
  socket.on(SocketEvent.UPDATE_ANSWER.constructor.name, (data) => {
    outputEventLog(
      LogLevel.INFO,
      socket.id,
      SocketEvent.UPDATE_ANSWER.constructor.name
    );

    // 受信パラメータ取得(roomId, answer)
    const UPDATE_ANSWER = SocketEvent.UPDATE_ANSWER.parseEventParameter(data);

    // 解答の設定
    access.setAnswer(UPDATE_ANSWER.roomId, socket.id, UPDATE_ANSWER.answer);

    // ゲームデータ取得
    const gameData = access.getAllGameData(UPDATE_ANSWER.roomId);

    // イベント[NOTIFY_GAMEDATA]送信
    broadcast(
      UPDATE_ANSWER.roomId,
      SocketEvent.NOTIFY_GAMEDATA,
      JSON.stringify(gameData)
    );
  });
  //#endregion

  //#region イベント[UPDATE_GAMEDATA]受信
  socket.on(SocketEvent.UPDATE_GAMEDATA.constructor.name, (data) => {
    outputEventLog(
      LogLevel.INFO,
      socket.id,
      SocketEvent.UPDATE_GAMEDATA.constructor.name
    );

    // 受信パラメータ取得(roomId, gameData)
    const UPDATE_GAMEDATA =
      SocketEvent.UPDATE_GAMEDATA.parseEventParameter(data);

    access.updateGameData(UPDATE_GAMEDATA.roomId, UPDATE_GAMEDATA.gameData);

    // 更新後のgameData取得
    const currentGameData = access.getAllGameData(UPDATE_GAMEDATA.roomId);

    // イベント[NOTIFY_GAMEDATA]送信
    broadcast(
      UPDATE_GAMEDATA.roomId,
      SocketEvent.NOTIFY_GAMEDATA,
      JSON.stringify(currentGameData)
    );
  });
  //#endregion
};

export default eventRcv;
