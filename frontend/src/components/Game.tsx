interface MemberProps {
  userName: string;
  answer: string;
  index: number;
}

const Game = () => {
  return (
    <>
      <div className="flex flex-col flex-grow items-center justify-center container mx-auto px-4">
        <DisplayThemeCard />
        <DisplayNumberCard />
        <AnswerForm />
        <DisplayAnswersSection />
      </div>
    </>
  );
};

const DisplayThemeCard = () => {
  const theme = "好きなお寿司のネタ";

  return (
    <div className="card bg-base-100 flex items-center w-full max-w-3xl rounded-2xl border border-slate-100 shadow-md">
      <div className="card-body">
        <span className="lg:text-xl">お題：</span>
        <h1 className="card-title text-2xl lg:text-4xl">{theme}</h1>
      </div>
    </div>
  );
};

const DisplayNumberCard = () => {
  const number = 100;

  return (
    <div className="card bg-base-100 flex items-center w-full max-w-3xl rounded-2xl border border-slate-100 shadow-md mt-2">
      <div className="card-body">
        <p className="lg:text-xl">
          あなたの数字は
          <span className="ml-6 text-5xl lg:text-7xl font-bold">{number}</span>
        </p>
      </div>
    </div>
  );
};

const AnswerForm = () => {
  return (
    <div className="flex flex-col lg:flex-row max-w-3xl w-full mt-4">
      <input
        type="text"
        className="input input-bordered w-full"
        placeholder="回答のテキストを入力"
      />
      <button className="btn btn-primary mt-2 lg:mt-0 lg:ml-4">Answer!</button>
    </div>
  );
};

const DisplayAnswersSection = () => {
  //#region デバッグ用パラメータ
  const members: MemberProps[] = [
    { userName: "AAA", answer: "まぐろの赤身", index: 0 },
    { userName: "BBB", answer: "かんぴょう巻き", index: 1 },
    { userName: "CCC", answer: "いくら", index: 2 },
    { userName: "DDD", answer: "サーモン", index: 3 },
    { userName: "EEE", answer: "納豆巻き", index: 4 },
    { userName: "FFF", answer: "ネギトロ", index: 5 },
    { userName: "GGG", answer: "カリフォルニアロール", index: 6 },
    { userName: "HHH", answer: "エビ", index: 7 },
  ];
  //#endregion

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center w-full my-6">
      {members.map((member, index) => {
        return <AnswerCard member={member} key={index} />;
      })}
    </div>
  );
};

const AnswerCard = (props: { member: MemberProps }) => {
  return (
    <div className="card bg-base-200 flex items-center rounded-2xl border border-slate-100 shadow-md w-full lg:w-fit mt-2 lg:mt-0 lg:ml-2">
      <div className="card-body px-5 py-1 lg:py-4">
        <span className="">{props.member.userName}</span>
        <h2 className="card-title text-xl lg:text-2xl">
          {props.member.answer}
        </h2>
      </div>
    </div>
  );
};

export default Game;
