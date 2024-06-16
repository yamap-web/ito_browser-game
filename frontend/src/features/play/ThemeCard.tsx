const ThemeCard = ({ theme }: { theme: string }) => {
  return (
    <div className="card bg-base-100 flex items-center w-full max-w-3xl rounded-2xl border border-slate-100 shadow-md">
      <div className="card-body">
        <span className="lg:text-xl">お題：</span>
        <h1 className="card-title text-2xl lg:text-4xl">{theme}</h1>
      </div>
    </div>
  );
};

export default ThemeCard;
