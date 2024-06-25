import { useState } from "react";

const IdCard = ({ isHost, roomId }: { isHost: boolean; roomId: string }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  // コピーボタンをクリックしたときの処理
  const handleCopyClick = () => {
    navigator.clipboard.writeText(roomId);
    setIsClicked(true);
  };

  if (isHost) {
    return (
      <div className="mb-4 flex justify-center">
        <div className="card mt-2 flex w-full max-w-sm items-center rounded-2xl bg-primary/30 shadow-md lg:max-w-md">
          <div className="card-body p-4">
            <div className="flex items-end lg:text-xl">
              ルームID：
              <span className="mx-2 text-3xl font-bold lg:text-5xl">
                {roomId}
              </span>
              <div
                className={
                  isClicked
                    ? "tooltip tooltip-right tooltip-open tooltip-secondary"
                    : "tooltip tooltip-right tooltip-secondary"
                }
                data-tip={isClicked ? "コピーしました" : "コピーする"}
              >
                <button
                  className="text-primary hover:text-primary/50"
                  onClick={() => handleCopyClick()}
                >
                  <svg
                    className="size-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <p className="lg:text-md text-center text-sm">参加者に伝えよう！</p>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default IdCard;
