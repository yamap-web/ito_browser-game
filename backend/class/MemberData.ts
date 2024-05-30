import { GameData } from "../interface/interface";

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
  /** Index */
  private index: number = 0;
  //#endregion

  /**
   * コンストラクタ
   */
  constructor(
    socketId: string,
    userName: string,
    isHost: boolean,
    index: number
  ) {
    this.socketId = socketId;
    this.userName = userName;
    this.isHost = isHost;
    this.index = index;
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
  public setIndex(index: number): void {
    this.index = index;
  }

  /** GameData取得 */
  public getGameData(): GameData {
    const gameData: GameData = {
      userName: this.userName,
      answer: this.answer,
      index: this.index,
    };

    return gameData;
  }
}

export default MemberData;
