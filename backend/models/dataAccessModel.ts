import MemberData from "../class/MemberData";
import { rooms } from "../data/data";
import { GameData, Room } from "../interface/interface";

class DataAccessModel {
  /** ルーム作成 */
  public createRoom(roomId: string): void {
    const room: Room = {
      roomId,
      gameData: [],
    };

    rooms.push(room);
  }

  /** ゲームで使用するパラメータの取得 */
  public getGameParam(roomId: string): GameData[] {
    const gameData: GameData[] = [];
    const room = rooms.find((room) => room.roomId === roomId);
    if (room) {
      room.gameData.forEach((member) => {
        gameData.push(member.getGameData());
      });
    }

    return gameData;
  }

  /** 参加者数取得 */
  public getNumberOfMember(roomId: string): number {
    const room = rooms.find((room) => room.roomId === roomId);

    if (room) {
      return room.gameData.length;
    }

    return 0;
  }

  /** メンバーに数字を設定 */
  public setNumber(roomId: string, numbers: number[]): void {
    const room = rooms.find((room) => room.roomId === roomId);
    numbers.forEach((number, index) => {
      if (room) {
        room.gameData[index].setNumber(number);
      }
    });
  }

  /** メンバーにIndexの設定 */
  public setIndex(roomId: string, socketId: string, index: number): void {
    const room = rooms.find((room) => room.roomId === roomId);
    if (room) {
      const member = room.gameData.find(
        (member) => member.getSocketId() === socketId
      );
      if (member) {
        member.setIndex(index);
      }
    }
  }

  /** メンバーにAnswerの設定 */
  public setAnswer(roomId: string, socketId: string, answer: string): void {
    const room = rooms.find((room) => room.roomId === roomId);
    if (room) {
      const member = room.gameData.find(
        (member) => member.getSocketId() === socketId
      );
      if (member) {
        member.setAnswer(answer);
      }
    }
  }

  /** メンバーの追加 */
  public setMember(
    roomId: string,
    socketId: string,
    userName: string,
    isHost: boolean
  ): void {
    const room = rooms.find((room) => room.roomId === roomId);

    if (room) {
      room.gameData.push(new MemberData(socketId, userName, isHost));
    }
  }
}

export default DataAccessModel;
