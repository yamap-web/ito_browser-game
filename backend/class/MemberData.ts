class MemberData {
  //#region データカラム
  /** SocketId */
  private socketId: String = "";
  /** UserName */
  private userName: String = "";
  /** IsHost(host: true, guest: false) */
  private isHost: Boolean = false;
  /** Number */
  private number: Number = 0;
  //#endregion

  /**
   * コンストラクタ
   */
  constructor(socketId: String, userName: String, host: Boolean) {
    this.socketId = socketId;
    this.userName = userName;
    this.isHost = host;
  }

  /** SocketId取得 */
  public getSocketId(): String {
    return this.socketId;
  }

  /** UserName取得 */
  public getUserName(): String {
    return this.userName;
  }

  /** ホスト判定 */
  public getIsHost(): Boolean {
    return this.isHost;
  }

  /** 数字取得 */
  public getNumber(): Number {
    return this.number;
  }

  /** 数字設定 */
  public setNumber(number: Number): void {
    this.number = number;
  }
}

export default MemberData;
