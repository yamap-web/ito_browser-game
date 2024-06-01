const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col flex-grow items-center justify-center">
        <h1 className="text-9xl">ito</h1>
        <EntryRoomForm />
        <InputNameModal />
      </div>
      <div className="pb-3 w-full text-center">
        <p>ⒸBrowser Game -ito- Development Team</p>
      </div>
    </div>
  );
};

const EntryRoomForm = () => {
  const openModal = () => {
    const modalElement = document.getElementById(
      "inputNameModal"
    ) as HTMLDialogElement;
    if (modalElement) {
      modalElement.showModal();
    }
  };

  return (
    <div className="mt-10">
      <div className="grid place-items-center">
        <form>
          <input type="text" className="input" placeholder="Enter Room ID" />
          <button className="btn btn-primary ml-4" onClick={() => openModal()}>
            Join Room!
          </button>
        </form>
      </div>
      <div className="divider">OR</div>
      <div className="grid">
        <button className="btn btn-primary" onClick={() => openModal()}>
          Create New Room
        </button>
      </div>
    </div>
  );
};

const InputNameModal = () => {
  return (
    <>
      <dialog id="inputNameModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h2 className="font-bold text-lg">ユーザーネームを登録</h2>
          <input
            type="text"
            className="input  input-bordered mt-4 w-full"
            placeholder="Enter Your Name"
          />
          <div className="modal-action mt-4">
            <form>
              <button className="btn">登録する</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Home;
