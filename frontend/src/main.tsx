import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const rootElm = document.getElementById("root");

if (rootElm) {
  const root = createRoot(rootElm);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
