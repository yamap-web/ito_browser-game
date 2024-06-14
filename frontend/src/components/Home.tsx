import type { Dispatch, SetStateAction, ChangeEvent } from "react";
import { useState } from "react";
import { socket } from "../utils/socket";
import SocketEvent from "../class/socketEvents";

import HeadBlock from "./HeadBlock";
import Footer from "./Footer";

interface HomeProps {
  setIsHost: Dispatch<SetStateAction<boolean>>;
  roomId: string;
  setRoomId: Dispatch<SetStateAction<string>>;
}

const Home = ({ setIsHost, roomId, setRoomId }: HomeProps) => {
  return (
    <>
      <HeadBlock title="ito(イト) | 価値観共有ゲーム" />
      <div className="flex flex-col flex-grow items-center justify-center">
        <h1 className="text-9xl font-bold tracking-wide mb-8">
          <svg
            width="124"
            height="87"
            viewBox="0 0 124 87"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.872 17.52C6.25067 17.52 4.8 16.88 3.52 15.6C2.32533 14.32 1.77067 12.8693 1.856 11.248L1.984 6.51199C2.06933 4.89066 2.70933 3.48266 3.904 2.28799C5.09867 1.09333 6.50667 0.495995 8.128 0.495995C9.74933 0.495995 11.1573 1.13599 12.352 2.41599C13.632 3.696 14.2293 5.104 14.144 6.64L14.016 11.504C13.9307 13.2107 13.2907 14.6613 12.096 15.856C10.9867 16.9653 9.57867 17.52 7.872 17.52ZM7.232 86.768C5.52533 86.768 4.032 86.1707 2.752 84.976C1.55733 83.696 0.96 82.2027 0.96 80.496L1.6 29.552C1.6 27.8453 2.19733 26.3947 3.392 25.2C4.672 23.92 6.16533 23.28 7.872 23.28C9.664 23.28 11.1573 23.92 12.352 25.2C13.5467 26.3947 14.144 27.8453 14.144 29.552L13.504 80.496C13.504 82.2027 12.864 83.696 11.584 84.976C10.3893 86.1707 8.93867 86.768 7.232 86.768ZM43.253 86.896C41.6317 86.896 40.181 86.2987 38.901 85.104C37.7063 83.9093 37.109 82.5013 37.109 80.88V35.184H26.997C25.2903 35.184 23.8397 34.5867 22.645 33.392C21.4503 32.112 20.853 30.6613 20.853 29.04C20.853 27.1627 21.493 25.6693 22.773 24.56C24.053 23.3653 25.5463 22.768 27.253 22.768H37.109V9.072C37.109 7.45067 37.7063 6 38.901 4.71999C40.0957 3.43999 41.5463 2.8 43.253 2.8C45.045 2.8 46.4957 3.43999 47.605 4.71999C48.7997 5.91466 49.397 7.36533 49.397 9.072V22.768H60.277C61.9837 22.768 63.4343 23.3653 64.629 24.56C65.8237 25.7547 66.421 27.248 66.421 29.04C66.421 30.6613 65.8237 32.112 64.629 33.392C63.4343 34.5867 61.9837 35.184 60.277 35.184H49.397V80.88C49.397 82.5013 48.7997 83.9093 47.605 85.104C46.4103 86.2987 44.9597 86.896 43.253 86.896ZM93.296 86.768C88.432 86.768 83.952 85.4453 79.856 82.8C75.8453 80.1547 72.688 76.5707 70.384 72.048C68.08 67.44 66.928 62.448 66.928 57.072C66.928 51.0133 68.2933 45.3813 71.024 40.176C73.7547 34.8853 77.424 30.704 82.032 27.632C86.64 24.4747 91.5893 22.896 96.88 22.896C101.744 22.896 106.181 24.2613 110.192 26.992C114.288 29.7227 117.488 33.3493 119.792 37.872C122.181 42.3947 123.376 47.2587 123.376 52.464C123.376 58.608 122.011 64.3253 119.28 69.616C116.549 74.8213 112.837 79.0027 108.144 82.16C103.536 85.232 98.5867 86.768 93.296 86.768ZM93.296 75.248C96.2827 75.248 99.1413 74.224 101.872 72.176C104.603 70.128 106.779 67.3973 108.4 63.984C110.021 60.5707 110.832 56.944 110.832 53.104C110.832 49.8613 110.192 46.832 108.912 44.016C107.632 41.1147 105.883 38.8107 103.664 37.104C101.445 35.312 99.0133 34.416 96.368 34.416C93.3813 34.416 90.5653 35.4827 87.92 37.616C85.36 39.664 83.312 42.4373 81.776 45.936C80.24 49.3493 79.472 53.0187 79.472 56.944C79.472 60.784 80.112 64.0693 81.392 66.8C82.7573 69.5307 84.464 71.6213 86.512 73.072C88.6453 74.5227 90.9067 75.248 93.296 75.248Z"
              fill="#161616"
            />
          </svg>
        </h1>
        <p className="py-3 text-sm">
          言葉で当てる 1~100！価値観共有ゲーム - イト -
        </p>
        <EntryRoomForm
          setIsHost={setIsHost}
          roomId={roomId}
          setRoomId={setRoomId}
        />
      </div>
      <Footer />
    </>
  );
};

const EntryRoomForm = ({
  setIsHost,
  roomId,
  setRoomId,
}: {
  setIsHost: Dispatch<SetStateAction<boolean>>;
  roomId: string;
  setRoomId: Dispatch<SetStateAction<string>>;
}) => {
  const [userName, setUserName] = useState("");

  const handleInputNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserName(value);
  };

  const handleInputIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRoomId(value);
  };

  const handleEntryBtnClick = (isHost: boolean) => {
    if (isHost) {
      setIsHost(true);
      socket.emit(SocketEvent.REQ_CREATEROOM, userName);
    } else {
      setIsHost(false);
      const parameter = { userName, roomId };
      socket.emit(SocketEvent.REQ_JOIN, JSON.stringify(parameter));
    }
  };

  return (
    <div className="max-w-xs">
      <div className="w-full mt-8">
        <h2 className="font-bold mb-2">STEP 1</h2>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="ユーザーネーム"
          onChange={handleInputNameChange}
          name="userName"
        />
      </div>
      <div className="mt-6">
        <h2 className="font-bold mb-2">STEP 2</h2>
        <div className="grid">
          <div>
            <input
              type="text"
              className="input input-bordered"
              placeholder="ルームID (ex. 1234)"
              onChange={handleInputIdChange}
            />
            <button
              className="btn btn-secondary ml-3"
              onClick={() => handleEntryBtnClick(false)}
            >
              参加する！
            </button>
          </div>
        </div>
        <div className="divider">OR</div>
        <div className="grid">
          <button
            className="btn btn-primary"
            onClick={() => handleEntryBtnClick(true)}
          >
            新しいルームを作成する！
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
