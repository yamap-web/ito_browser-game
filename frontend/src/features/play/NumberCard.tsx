const DisplayNumberCard = ({ number }: { number: number }) => {
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

export default DisplayNumberCard;
