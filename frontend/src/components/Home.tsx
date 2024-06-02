import { useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="flex flex-col flex-grow items-center justify-center">
        <h1 className="text-9xl font-bold tracking-wide">ito</h1>
        <p className="py-3 text-sm">言葉で当てる 1~100！価値観共有ゲーム - イト -</p>
        <EntryRoomForm />
        <InputNameModal />
      </div>
      <footer className="py-3 text-center">
        <small>Ⓒ Browser Game -ito- Development Team 2024</small>
      </footer>
    </>
  );
};

const EntryRoomForm = () => {
  const openModal = () => {
    const modalElement = document.getElementById(
      "input-name-modal"
    ) as HTMLDialogElement;
    if (modalElement) {
      modalElement.showModal();
    }
  };

  return (
    <div className="mt-10">
      <div className="grid">
        <form>
          <input type="text" className="input" placeholder="Room ID (ex. 1234)" />
          <button className="btn btn-primary ml-4" onClick={() => openModal()}>
            Join Room!
          </button>
        </form>
      </div>
      <div className="divider">OR</div>
      <div className="grid">
        <button className="btn btn-primary" onClick={() => openModal()}>
          Create New Room!
        </button>
      </div>
    </div>
  );
};

const InputNameModal = () => {
  const navigate = useNavigate()
    const handleStandby = () => {
        navigate('/standby')
    }

  return (
    <>
      <dialog id="input-name-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h2 className="font-bold text-lg">ユーザーネームを登録</h2>
          <input
            type="text"
            className="input input-bordered mt-4 w-full"
            placeholder="User Name"
          />
          <div className="modal-action mt-4">
              <button className="btn" onClick={handleStandby}>登録する</button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Home;
