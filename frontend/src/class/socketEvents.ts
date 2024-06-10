import { GameData } from "../interfaces/interface";

// イベントの抽象クラス
abstract class EventClass {
  abstract parseEventParameter(parameter: string): EventClass;
}

// RES_CREATEROOM
class RES_CREATEROOM implements EventClass {
  public roomId: string = "";

  constructor(roomId: string = "") {
    this.roomId = roomId;
  }

  parseEventParameter(parameter: string): RES_CREATEROOM {
    const roomId: string = parameter;
    return new RES_CREATEROOM(roomId);
  }
}

// NOTIFY_GAMEDATA
class NOTIFY_GAMEDATA implements EventClass {
  public gameData: GameData[] = [];

  constructor(gameData: GameData[] = []) {
    this.gameData = gameData;
  }

  parseEventParameter(parameter: string): NOTIFY_GAMEDATA {
    const gameData: GameData[] = JSON.parse(parameter);
    return new NOTIFY_GAMEDATA(gameData);
  }
}

// RES_JOIN
class RES_JOIN implements EventClass {
  public errorMsg: string = "";

  constructor(errorMsg: string = "") {
    this.errorMsg = errorMsg;
  }

  parseEventParameter(parameter: string): RES_JOIN {
    const errorMsg: string = parameter;
    return new RES_JOIN(errorMsg);
  }
}

// NOTIFY_THEME
class NOTIFY_THEME implements EventClass {
  public theme: string = "";

  constructor(theme: string = "") {
    this.theme = theme;
  }

  parseEventParameter(parameter: string): NOTIFY_THEME {
    const theme: string = parameter;
    return new NOTIFY_THEME(theme);
  }
}

// NOTIFY_NUMBER
class NOTIFY_NUMBER implements EventClass {
  public number: number = 0;

  constructor(number: number = 0) {
    this.number = number;
  }

  parseEventParameter(parameter: string): NOTIFY_NUMBER {
    const number: number = Number(parameter);
    return new NOTIFY_NUMBER(number);
  }
}

// RES_START
class RES_START implements EventClass {
  public errorMsg: string = "";

  constructor(errorMsg: string = "") {
    this.errorMsg = errorMsg;
  }

  parseEventParameter(parameter: string): RES_START {
    const errorMsg: string = parameter;
    return new RES_START(errorMsg);
  }
}

// RES_RESULT
class RES_RESULT implements EventClass {
  public result: boolean = false;

  constructor(result: boolean = false) {
    this.result = result;
  }

  parseEventParameter(parameter: string): RES_RESULT {
    let result: boolean = false;
    if (parameter === "TRUE") {
      result = true;
    }
    return new RES_RESULT(result);
  }
}

// SocketEventクラス
class SocketEvent {
  // 送信イベント
  public static REQ_RESULT = "REQ_RESULT";
  public static UPDATE_ANSWER = "UPDATE_ANSWER";

  // 受信イベントのクラスインスタンス生成
  static RES_CREATEROOM = new RES_CREATEROOM();
  static NOTIFY_GAMEDATA = new NOTIFY_GAMEDATA();
  static RES_JOIN = new RES_JOIN();
  static NOTIFY_THEME = new NOTIFY_THEME();
  static NOTIFY_NUMBER = new NOTIFY_NUMBER();
  static RES_START = new RES_START();
  static RES_RESULT = new RES_RESULT();
}

export default SocketEvent;
