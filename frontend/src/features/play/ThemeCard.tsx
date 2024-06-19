const ThemeCard = ({ theme }: { theme: string }) => {
  return (
    <div className="card mt-4 flex w-full max-w-3xl items-center rounded-2xl border border-slate-100 bg-base-100 shadow-md">
      <div className="card-body">
        <span className="lg:text-xl">お題：</span>
        <h1 className="card-title text-2xl lg:text-4xl">{theme}</h1>
      </div>
    </div>
  );
};

export default ThemeCard;
