import MemberData from "../class/MemberData";

/** Roomインターフェース */
export interface Room {
  roomId: string;
  gameData: MemberData[];
}

/** GameDataインターフェース */
export interface GameData {
  userName: string;
  answer: string;
  orderIndex: number;
  number: number;
}

/** Clientsインターフェース */
export interface Clients {
  socketId: string;
  roomId: string;
  isHost: boolean;
}
