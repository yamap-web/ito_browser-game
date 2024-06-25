import { GameData } from "../interfaces/interface";
import DataAccessModel from "../models/dataAccessModel";

const access = new DataAccessModel();

export const getNumbers = (num: number, min: number = 1, max: number = 100) => {
  const numbers: number[] = [];
  for (let i = min; i <= max; i++) {
    numbers.push(i);
  }

  const shuffle = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const shuffledNumbers = shuffle(numbers);

  return shuffledNumbers.slice(0, num);
};

export const judgement = (gameData: GameData[]): boolean => {
  let correctAnswer: GameData[] = [...gameData];
  correctAnswer = correctAnswer.sort((a, b) => a.number - b.number);
  let userAnswer: GameData[] = [...gameData];
  userAnswer = userAnswer.sort((a, b) => a.orderIndex - b.orderIndex);

  for (let i = 0; i < gameData.length; i++) {
    if (correctAnswer[i].orderIndex !== userAnswer[i].orderIndex) {
      return false;
    }
  }

  return true;
};

export const createRoomId = (): string => {
  const strList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let aryRoomId: string[] = [];
  let randomIndex: number[] = [];

  randomIndex = getNumbers(4, 0, strList.length - 1);

  aryRoomId = randomIndex.map((index) => {
    return strList[index];
  });

  // 重複した場合、再度生成。
  while (checkRoomId(aryRoomId.join(""))) {
    randomIndex = getNumbers(4, 0, strList.length);
    aryRoomId = randomIndex.map((index) => {
      return strList[index];
    });
  }

  return aryRoomId.join("");
};

// ルームIDの重複チェック
const checkRoomId = (roomId: string): boolean => {
  const roomIdList = access.getRoomIdList();

  return roomIdList.includes(roomId);
};
