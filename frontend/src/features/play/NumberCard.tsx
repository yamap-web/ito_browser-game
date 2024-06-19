const DisplayNumberCard = ({ number }: { number: number }) => {
  return (
    <div className="card mt-2 flex w-full max-w-3xl items-center rounded-2xl border border-slate-100 bg-base-100 shadow-md">
      <div className="card-body">
        <p className="lg:text-xl">
          あなたの数字は
          <span className="ml-6 text-5xl font-bold lg:text-7xl">{number}</span>
        </p>
      </div>
    </div>
  );
};

export default DisplayNumberCard;
