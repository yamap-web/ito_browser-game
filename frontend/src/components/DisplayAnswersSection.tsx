import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import type { GameData } from "../interfaces/interface";

const DisplayAnswersSection = (props: { gameData: GameData[] }) => {
  //#region デバッグ用パラメータ
  // const members: GameData[] = [
  //   { userName: "AAA", answer: "まぐろの赤身", index: 7 },
  //   { userName: "BBB", answer: "かんぴょう巻き", index: 1 },
  //   { userName: "CCC", answer: "いくら", index: 5 },
  //   { userName: "DDD", answer: "サーモン", index: 0 },
  //   { userName: "EEE", answer: "納豆巻き", index: 4 },
  //   { userName: "FFF", answer: "ネギトロ", index: 3 },
  //   { userName: "GGG", answer: "カリフォルニアロール", index: 6 },
  //   { userName: "HHH", answer: "エビ", index: 2 },
  // ];
  //#endregion
  const members = props.gameData;

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
    reorder(members, result.source.index, result.destination.index);
  };

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
              {members.map((member, index) => (
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
                      <AnswerCard member={member} key={index} />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

const AnswerCard = (props: { member: GameData }) => {
  return (
    <div className="card-body px-5 py-1 lg:py-4">
      <span className="">{props.member.userName}</span>
      <h2 className="card-title text-xl lg:text-2xl">{props.member.answer}</h2>
    </div>
  );
};

export default DisplayAnswersSection;
