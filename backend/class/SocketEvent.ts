import { GameData } from "../interfaces/interface";

//#region イベントの抽象クラス
abstract class EventClass {
  abstract parseEventParameter(parameter: string): void;
}
//#endregion

//#region イベントクラス一覧

//#region REQ_CREATEROOM
class REQ_CREATEROOM implements EventClass {
  //#region イベントパラメータ
  public userName: string = "";
  //#endregion

  //#region コンストラクタ
  constructor(userName: string = "") {
    this.userName = userName;
  }
  //#endregion

  //#region パラメータ解析メソッド
  parseEventParameter(parameter: string): REQ_CREATEROOM {
    const { userName } = JSON.parse(parameter);

    return new REQ_CREATEROOM(userName);
  }
  //#endregion
}
//#endregion

//#region REQ_JOIN
class REQ_JOIN implements EventClass {
  //#region イベントパラメータ
  public userName: string = "";
  public roomId: string = "";
  //#endregion

  //#region コンストラクタ
  constructor(userName: string = "", roomId: string = "") {
    this.userName = userName;
    this.roomId = roomId;
  }
  //#endregion

  //#region パラメータ解析メソッド
  parseEventParameter(parameter: string): REQ_JOIN {
    const { userName, roomId } = JSON.parse(parameter);

    return new REQ_JOIN(userName, roomId);
  }
  //#endregion
}
//#endregion

//#region REQ_START
class REQ_START implements EventClass {
  //#region イベントパラメータ
  public roomId: string = "";
  public theme: string = "";
  //#endregion

  //#region コンストラクタ
  constructor(roomId: string = "", theme: string = "") {
    this.roomId = roomId;
    this.theme = theme;
  }
  //#endregion

  //#region パラメータ解析メソッド
  parseEventParameter(parameter: string): REQ_START {
    const { roomId, theme } = JSON.parse(parameter);

    return new REQ_START(roomId, theme);
  }
  //#endregion
}
//#endregion

//#region REQ_RESULT
class REQ_RESULT implements EventClass {
  //#region イベントパラメータ
  public roomId: string = "";
  public gameData: GameData[] = [];
  //#endregion

  //#region コンストラクタ
  constructor(roomId: string = "", gameData: GameData[] = []) {
    this.roomId = roomId;
    this.gameData = gameData;
  }
  //#endregion

  //#region パラメータ解析メソッド
  parseEventParameter(parameter: string): REQ_RESULT {
    const { roomId, gameData } = JSON.parse(parameter);

    return new REQ_RESULT(roomId, gameData);
  }
  //#endregion
}
//#endregion

//#region UPDATE_ANSWER
class UPDATE_ANSWER implements EventClass {
  //#region イベントパラメータ
  public roomId: string = "";
  public answer: string = "";
  //#endregion

  //#region コンストラクタ
  constructor(roomId: string = "", answer: string = "") {
    this.roomId = roomId;
    this.answer = answer;
  }
  //#endregion

  //#region パラメータ解析メソッド
  parseEventParameter(parameter: string): UPDATE_ANSWER {
    const { roomId, answer } = JSON.parse(parameter);

    return new UPDATE_ANSWER(roomId, answer);
  }
  //#endregion
}
//#endregion

//#region UPDATE_GAMEDATA
class UPDATE_GAMEDATA implements EventClass {
  //#region イベントパラメータ
  public roomId: string = "";
  public gameData: GameData[] = [];
  //#endregion

  //#region  コンストラクタ
  constructor(roomId: string = "", gameData: GameData[] = []) {
    this.roomId = roomId;
    this.gameData = gameData;
  }
  //#endregion

  //#region パラメータ解析メソッド
  parseEventParameter(parameter: string): UPDATE_GAMEDATA {
    const { roomId, gameData } = JSON.parse(parameter);

    return new UPDATE_GAMEDATA(roomId, gameData);
  }
  //#endregion
}
//#endregion

//#region REQ_CLOSEROOM
class REQ_CLOSEROOM implements EventClass {
  //#region イベントパラメータ
  public roomId: string = "";
  //#endregion

  //#region コンストラクタ
  constructor(roomId: string = "") {
    this.roomId = roomId;
  }
  //#endregion

  //#region パラメータ解析メソッド
  parseEventParameter(parameter: string): REQ_CLOSEROOM {
    const { roomId } = JSON.parse(parameter);

    return new REQ_CLOSEROOM(roomId);
  }
  //#endregion
}

class REQ_NEXTGAME implements EventClass {
  //#region イベントパラメータ
  public roomId: string = "";
  //#endregion

  //#region コンストラクタ
  constructor(roomId: string = "") {
    this.roomId = roomId;
  }
  //#endregion

  //#region パラメータ解析メソッド
  parseEventParameter(parameter: string): REQ_NEXTGAME {
    const { roomId } = JSON.parse(parameter);

    return new REQ_NEXTGAME(roomId);
  }
  //#endregion
}
//#endregion

//#region SocketEventクラス
class SocketEvent {
  //#region 受信イベント
  public static CONNECTION = "connection";
  public static DISCONNECT = "disconnect";
  //#endregion

  //#region 送信イベント
  public static NOTIFY_GAMEDATA = "NOTIFY_GAMEDATA";
  public static RES_CREATEROOM = "RES_CREATEROOM";
  public static RES_JOIN = "RES_JOIN";
  public static NOTIFY_NUMBER = "NOTIFY_NUMBER";
  public static NOTIFY_THEME = "NOTIFY_THEME";
  public static RES_START = "RES_START";
  public static RES_RESULT = "RES_RESULT";
  public static RES_CLOSEROOM = "RES_CLOSEROOM";
  public static RES_NEXTGAME = "RES_NEXTGAME";
  //#endregion

  //#region 受信イベントクラスのインスタンス生成
  static REQ_CREATEROOM = new REQ_CREATEROOM();
  static REQ_JOIN = new REQ_JOIN();
  static REQ_START = new REQ_START();
  static REQ_RESULT = new REQ_RESULT();
  static UPDATE_ANSWER = new UPDATE_ANSWER();
  static UPDATE_GAMEDATA = new UPDATE_GAMEDATA();
  static REQ_CLOSEROOM = new REQ_CLOSEROOM();
  static REQ_NEXTGAME = new REQ_NEXTGAME();
  //#endregion
}
//#endregion

export default SocketEvent;
