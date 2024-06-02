import MemberData from "../class/MemberData";
import { rooms } from "../data/data";
import { GameData, Room } from "../interface/interface";

class DataAccessModel {
  /** ルームIDに一致するルームを取得 */
  private findRoom(roomId: string): Room | undefined {
    return rooms.find((room) => room.roomId === roomId);
  }

  /** ルームIDとSocketIDに一致するメンバーを取得 */
  private findMember(roomId: string, socketId: string): MemberData | undefined {
    const room = this.findRoom(roomId);
    if (room) {
      return room.gameData.find((member) => member.getSocketId() === socketId);
    }
  }

  /** ルームの作成 & ホストの追加 */
  public createRoom(roomId: string, socketId: string, userName: string): void {
    // ルームの追加
    const room: Room = {
      roomId,
      gameData: [],
    };

    // ホストの追加
    room.gameData.push(new MemberData(socketId, userName, true, 0));
    rooms.push(room);
  }

  /** ルーム内のすべてのゲームデータの取得 */
  public getAllGameData(roomId: string): GameData[] {
    const room = this.findRoom(roomId);
    return room ? room.gameData.map((member) => member.getGameData()) : [];
  }

  /** 参加者数の取得 */
  public getNumberOfMembers(roomId: string): number {
    const room = this.findRoom(roomId);
    return room ? room.gameData.length : 0;
  }

  /** メンバーに数字を設定 */
  public setNumber(roomId: string, numbers: number[]): void {
    const room = this.findRoom(roomId);
    if (room) {
      numbers.forEach((number, index) => {
        room.gameData[index].setNumber(number);
      });
    }
  }

  /** メンバーにIndexの設定 */
  public setIndex(roomId: string, socketId: string, index: number): void {
    const member = this.findMember(roomId, socketId);
    if (member) {
      member.setIndex(index);
    }
  }

  /** メンバーにAnswerの設定 */
  public setAnswer(roomId: string, socketId: string, answer: string): void {
    const member = this.findMember(roomId, socketId);
    if (member) {
      member.setAnswer(answer);
    }
  }

  /** メンバーの追加 */
  public setMember(
    roomId: string,
    socketId: string,
    userName: string,
    isHost: boolean
  ): void {
    const room = this.findRoom(roomId);
    if (room) {
      // 参加者数を取得
      const numberOfMembers = room.gameData.length;
      room.gameData.push(
        new MemberData(socketId, userName, isHost, numberOfMembers)
      );
    }
  }

  /** ゲームデータの更新（並び替え時）※ホスト用 */
  public updateGameData(roomId: string, gameData: GameData[]) {
    const room = this.findRoom(roomId);
    if (room) {
      room.gameData.forEach((currentData) => {
        gameData.forEach((updateData) => {
          if (updateData.userName === currentData.getUserName()) {
            currentData.setIndex(updateData.index);
          }
        });
      });
    }
  }
}

export default DataAccessModel;