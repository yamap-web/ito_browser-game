import type { Dispatch, SetStateAction } from "react";

interface ErrorAlertProps {
  errorMsg: string;
  setErrorMsg: Dispatch<SetStateAction<string>>;
}

const ErrorAlert = ({ errorMsg, setErrorMsg }: ErrorAlertProps) => {
  if (errorMsg === "") {
    return null;
  } else {
    return (
      <div className="fixed left-1/2 z-50 w-full max-w-max -translate-x-1/2 p-4">
        <div className="alert alert-warning shadow-md" role="alert">
          <svg
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          <span>{errorMsg}</span>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setErrorMsg("")}
          >
            ✕
          </button>
        </div>
      </div>
    );
  }
};

export default ErrorAlert;
