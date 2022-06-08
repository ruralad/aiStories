import { useState } from "react";
import useLocalStorage from "use-local-storage";
import "./styles/App.css";

import Home from "./components/Home";
import TopBar from "./components/Topbar";

export default function App() {
  const [info, setInfo] = useState(false);
  document.title = "aiStories | stories written by gpt-3";
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  return (
    <div className="app" data-theme={theme}>
      {!info && <TopBar theme={theme} setInfo={setInfo} setTheme={setTheme} />}
      <Home info={info} setInfo={setInfo} />
    </div>
  );
}
