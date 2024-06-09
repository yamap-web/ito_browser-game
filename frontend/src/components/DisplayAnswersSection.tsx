import type { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { GameData } from "../interfaces/interface";
import { socket } from "../utils/socket";

const DisplayAnswersSection = ({
  gameData,
  setGameData,
  roomId,
  resultFlg,
}: {
  gameData: GameData[];
  setGameData: Dispatch<SetStateAction<GameData[]>>;
  roomId: string;
  resultFlg: boolean;
}) => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);

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
    socket.emit("UPDATE_GAMEDATA", JSON.stringify(data));
  };

  // orderIndex順にソート
  gameData.sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="droppable"
          direction={isLargeScreen ? "horizontal" : undefined}
        >
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col lg:flex-row items-center justify-center w-full my-6"
            >
              <li className="badge badge-outline border-2 font-bold">
                1
              </li>
              {gameData.map((member, index) => (
                <Draggable
                  key={member.userName}
                  draggableId={member.userName}
                  index={index}
                >
                  {(provided) => (
                    <li
                      className="card bg-base-200 flex items-center rounded-2xl border border-slate-100 shadow-md w-full lg:w-fit mt-2 lg:mt-0 lg:ml-2"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <AnswerCard
                        member={member}
                        key={index}
                        resultFlg={resultFlg}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <li className="badge badge-outline border-2 font-bold mt-2 lg:mt-0 lg:ml-2">
                100
              </li>
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

const AnswerCard = ({
  member,
  resultFlg,
}: {
  member: GameData;
  resultFlg: boolean;
}) => {
  const number = 100;
  return (
    <div className="card-body px-5 py-1 lg:py-4">
      <span className="">{member.userName}</span>
      <h2 className="card-title text-xl lg:text-2xl">
        {resultFlg ? number : member.answer}
      </h2>
    </div>
  );
};

export default DisplayAnswersSection;
