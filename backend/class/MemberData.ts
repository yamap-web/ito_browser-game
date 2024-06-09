import { GameData } from "../interfaces/interface";

class MemberData {
  //#region データカラム
  /** SocketId */
  private socketId: string = "";
  /** UserName */
  private userName: string = "";
  /** IsHost(host: true, guest: false) */
  private isHost: boolean = false;
  /** Number */
  private number: number = 0;
  /** Answer */
  private answer: string = "";
  /** OrderIndex */
  private orderIndex: number = 0;
  //#endregion

  /**
   * コンストラクタ
   */
  constructor(
    socketId: string,
    userName: string,
    isHost: boolean,
    orderIndex: number
  ) {
    this.socketId = socketId;
    this.userName = userName;
    this.isHost = isHost;
    this.orderIndex = orderIndex;
  }

  /** SocketId取得 */
  public getSocketId(): string {
    return this.socketId;
  }

  /** UserName取得 */
  public getUserName(): string {
    return this.userName;
  }

  /** ホスト判定 */
  public getIsHost(): boolean {
    return this.isHost;
  }

  /** 数字取得 */
  public getNumber(): number {
    return this.number;
  }

  /** 数字設定 */
  public setNumber(number: number): void {
    this.number = number;
  }

  /** 解答設定 */
  public setAnswer(answer: string): void {
    this.answer = answer;
  }

  /** インデックス設定 */
  public setOrderIndex(orderIndex: number): void {
    this.orderIndex = orderIndex;
  }

  /** GameData取得 */
  public getGameData(finFlg: boolean = false): GameData {
    const gameData: GameData = finFlg
      ? {
          userName: this.userName,
          answer: this.answer,
          orderIndex: this.orderIndex,
          number: this.number,
        }
      : {
          userName: this.userName,
          answer: this.answer,
          orderIndex: this.orderIndex,
          number: 0,
        };

    return gameData;
  }
}

export default MemberData;
