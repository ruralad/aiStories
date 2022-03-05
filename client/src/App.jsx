import { useState } from "react";
import useLocalStorage from "use-local-storage";
import "./styles/App.css";

import Home from "./components/Home";
import TopBar from "./components/Topbar";

export default function App() {
  const [info, setInfo] = useState(false);
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  return (
    <div className="app" data-theme={theme}>
      {!info && <TopBar theme={theme} setInfo={setInfo} setTheme={setTheme} />}
      <Home info={info} setInfo={setInfo} />
    </div>
  );
}
