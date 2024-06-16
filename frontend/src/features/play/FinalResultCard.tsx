const FinalResultCard = ({ result }: { result: boolean }) => {
  return (
    <div className="card bg-gradient-to-r from-primary to-secondary flex items-center w-full max-w-3xl rounded-2xl shadow-md">
      <div className="card-body">
        <span className="text-white">The Final Result is...</span>
        <h2 className="text-white text-center font-bold text-5xl">
          {result ? "CLEAR!!!" : "GAME OVER"}
        </h2>
        <p className="text-center text-white font-bold">
          {result
            ? "絆の強さが証明されましたね！"
            : "もっともっと仲良くなれますね！"}
        </p>
      </div>
    </div>
  );
};

export default FinalResultCard;
