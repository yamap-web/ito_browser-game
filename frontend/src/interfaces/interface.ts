export interface GameData {
  userName: string;
  answer: string;
  index: number;
}

export interface StandbyProps {
  isHost: boolean;
  gameData: GameData[];
  roomId: string;
}