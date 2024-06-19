// Types
import type { Dispatch, SetStateAction } from "react";

// External packages
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Interfaces
import { GameData } from "@/interfaces/interface";

// Utils
import { socket } from "@/utils/socket";

// Class
import SocketEvent from "@/class/socketEvents";

interface SortAnswerBoardProps {
  isHost: boolean;
  gameData: GameData[];
  setGameData: Dispatch<SetStateAction<GameData[]>>;
  roomId: string;
}

const SortAnswerBoard = ({
  isHost,
  gameData,
  setGameData,
  roomId,
}: SortAnswerBoardProps) => {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const reorder = (list: GameData[], startIndex: number, endIndex: number) => {
    const removed = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removed[0]);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    reorder(gameData, result.source.index, result.destination.index);

    const updatedGameData = gameData.map((data, index) => {
      return { ...data, orderIndex: index };
    });

    setGameData(updatedGameData);

    // gameDataにroomIdを付与して送信
    const data = {
      roomId,
      gameData: updatedGameData,
    };
    socket.emit(SocketEvent.UPDATE_GAMEDATA, JSON.stringify(data));
  };

  // orderIndex順にソート
  gameData.sort((a, b) => a.orderIndex - b.orderIndex);

  if (isHost) {
    return (
      <>
        <div className="mt-4">
          <p className="text-sm lg:text-base">
            あなたがホストです！
            <br className="lg:hidden" />
            カードの並び替えを行ってください！
          </p>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="droppable"
            direction={isLargeScreen ? "horizontal" : undefined}
          >
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="my-6 flex w-full flex-col items-center justify-center lg:flex-row"
              >
                <li className="badge badge-outline border-2 font-bold">1</li>
                {gameData.map((member, index) => (
                  <Draggable
                    key={member.userName}
                    draggableId={member.userName}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        className="card mt-2 flex w-full items-center rounded-2xl border border-slate-100 bg-base-200 shadow-md lg:ml-2 lg:mt-0 lg:w-fit"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <AnswerCard member={member} key={index} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <li className="badge badge-outline mt-2 border-2 font-bold lg:ml-2 lg:mt-0">
                  100
                </li>
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
  } else {
    return (
      <>
        <div className="mt-4">
          <p className="text-sm lg:text-base">
            ホストがカードを並び替えます。
            <br className="lg:hidden" />
            協力して順番を見極めましょう！
          </p>
        </div>
        <ul className="my-6 flex w-full flex-col items-center justify-center lg:flex-row">
          <li className="badge badge-outline border-2 font-bold">1</li>
          {gameData.map((member, index) => (
            <li className="card mt-2 flex w-full items-center rounded-2xl border border-slate-100 bg-base-200 shadow-md lg:ml-2 lg:mt-0 lg:w-fit">
              <AnswerCard member={member} key={index} />
            </li>
          ))}
          <li className="badge badge-outline mt-2 border-2 font-bold lg:ml-2 lg:mt-0">
            100
          </li>
        </ul>
      </>
    );
  }
};

const AnswerCard = ({ member }: { member: GameData }) => {
  return (
    <div className="card-body px-5 py-1 lg:py-4">
      <span className="">{member.userName}</span>
      <h2 className="card-title text-xl lg:text-2xl">{member.answer}</h2>
    </div>
  );
};

export default SortAnswerBoard;
