import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col flex-grow items-center justify-center">
        <h1 className="text-6xl font-bold tracking-wide">404 NOT FOUND</h1>
        <p className="py-3 text-sm">お探しのページが見つかりませんでした。</p>
        <Link to="/">
          <button className="btn mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
            Topに戻る
          </button>
        </Link>
      </div>
      <footer className="py-3 text-center">
        <small>Ⓒ Browser Game -ito- Development Team 2024</small>
      </footer>
    </>
  );
};

export default NotFound;