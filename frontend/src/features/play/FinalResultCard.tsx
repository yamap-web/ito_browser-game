const FinalResultCard = ({ result }: { result: boolean }) => {
  return (
    <div className="card flex w-full max-w-3xl items-center rounded-2xl bg-gradient-to-r from-primary to-secondary shadow-md">
      <div className="card-body">
        <span className="text-white">The Final Result is...</span>
        <h2 className="text-center text-5xl font-bold text-white">
          {result ? "CLEAR!!!" : "GAME OVER"}
        </h2>
        <p className="text-center font-bold text-white">
          {result
            ? "絆の強さが証明されましたね！"
            : "もっともっと仲良くなれますね！"}
        </p>
      </div>
    </div>
  );
};

export default FinalResultCard;
