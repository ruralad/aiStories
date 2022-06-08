import useLocalStorage from "use-local-storage";
import TopBar from "./components/Topbar";
import TodayStory from "./components/TodaysStory";
import { useState } from "react";

import styles from "./styles/today.module.css"

export default function Today() {
  const [info, setInfo] = useState(false);
  document.title = "today's story | aiStories";
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

    return (
      <div className={styles.app} data-theme={theme}>
      {!info && <TopBar theme={theme} setInfo={false} setTheme={setTheme} />}
      <TodayStory theme={theme}/>
    </div>
    );
  }