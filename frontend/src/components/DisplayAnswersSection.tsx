import type { GameData } from "../interfaces/interface";

const DisplayAnswersSection = () => {
  //#region デバッグ用パラメータ
  const members: GameData[] = [
    { userName: "AAA", answer: "まぐろの赤身", index: 7 },
    { userName: "BBB", answer: "かんぴょう巻き", index: 1 },
    { userName: "CCC", answer: "いくら", index: 5 },
    { userName: "DDD", answer: "サーモン", index: 0 },
    { userName: "EEE", answer: "納豆巻き", index: 4 },
    { userName: "FFF", answer: "ネギトロ", index: 3 },
    { userName: "GGG", answer: "カリフォルニアロール", index: 6 },
    { userName: "HHH", answer: "エビ", index: 2 },
  ];
  //#endregion

  return (
    <ul className="flex flex-col lg:flex-row items-center justify-center w-full my-6">
      {members
        .sort((a, b) => a.index - b.index)
        .map((member, index) => {
          return <AnswerCard member={member} key={index} />;
        })}
    </ul>
  );
};

const AnswerCard = (props: { member: GameData }) => {
  return (
    <li
      draggable="true"
      className="card bg-base-200 flex items-center rounded-2xl border border-slate-100 shadow-md w-full lg:w-fit mt-2 lg:mt-0 lg:ml-2"
    >
      <div className="card-body px-5 py-1 lg:py-4">
        <span className="">{props.member.userName}</span>
        <h2 className="card-title text-xl lg:text-2xl">
          {props.member.answer}
        </h2>
      </div>
    </li>
  );
};

export default DisplayAnswersSection;
