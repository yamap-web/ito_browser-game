import MemberData from "../class/MemberData";
import { rooms } from "../data/data";
import { Room } from "../interface/interface";

class DataAccessModel {
  /** ルーム作成 */
  public createRoom(roomId: String): void {
    const room: Room = {
      roomId,
      gameData: [],
    };

    rooms.push(room);
  }

  /** ルームIDに一致するルームを取得 */
  public getRoom(roomId: String): Room | null {
    const room = rooms.find((room) => room.roomId === roomId);
    return room || null;
  }

  /** 参加者数取得 */
  public getNumberOfMember(roomId: String): Number {
    const room = rooms.find((room) => room.roomId === roomId);

    if (room) {
      return room.gameData.length;
    }

    return 0;
  }

  /** メンバーに数字を設定 */
  public setNumber(roomId: String, numbers: Number[]): void {
    const room = rooms.find((room) => room.roomId === roomId);
    numbers.forEach((number, index) => {
      if (room) {
        room.gameData[index].setNumber(number);
      }
    });
  }

  /** メンバーの追加 */
  public setMember(
    roomId: String,
    socketId: String,
    userName: String,
    isHost: Boolean
  ): void {
    const room = rooms.find((room) => room.roomId === roomId);

    if (room) {
      room.gameData.push(new MemberData(socketId, userName, isHost));
    }
  }
}

export default DataAccessModel;
