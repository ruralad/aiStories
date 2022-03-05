import { useState } from "react";
import useLocalStorage from "use-local-storage";
import "./styles/App.css";

import Home from "./components/Home";

import sun from "./assets/sun.png";
import moon from "./assets/moon.png";
import infolight from "./assets/infolight.png";
import infodark from "./assets/infodark.png";

export default function App() {
  const [info, setInfo] = useState(false);
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  
  function TopBar() {
    return (
      <div className="topbar">
        {theme === "light" && (
          <img src={moon} onClick={switchTheme} alt="switchtodark" />
        )}
        {theme === "dark" && (
          <img src={sun} onClick={switchTheme} alt="switchtolight" />
        )}
        <img
          src={theme === "light" ? infodark : infolight}
          onClick={() => {
            setInfo(true);
          }}
          alt="info"
        />
      </div>
    );
  }
  
  return (
    <div className="app" data-theme={theme}>
      {!info && <TopBar />}
      <Home info = {info} setInfo={setInfo}/>
      </div>
  );
}
