import { useState } from "react";
import useLocalStorage from "use-local-storage";
import "./styles/App.css";
import styles from "./styles/all.module.css"

import Home from "./components/Home";
import TopBar from "./components/Topbar";

export default function All() {
  const [info, setInfo] = useState(false);
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  return (
    <div className="app" data-theme={theme}>
      {!info && <TopBar theme={theme} setInfo={false} setTheme={setTheme} />}
      <div>working on it</div>
      <a href="/" className={styles.working}>go back home</a>
    </div>
  );
}
