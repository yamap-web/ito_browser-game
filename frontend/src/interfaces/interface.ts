export interface GameData {
  userName: string;
  answer: string;
  orderIndex: number;
}

export interface StandbyProps {
  isHost: boolean;
  gameData: GameData[];
  roomId: string;
}