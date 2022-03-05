import { useState } from "react";
import {useLocalStorage} from "use-local-storage";
import "./styles/App.css";

import book from "./assets/book.png";
import books from "./assets/books.png";
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

  function InfoCard() {
    return (
      <div className="infoCard">
        {info && (
          <span
            className="hideButton"
            onClick={() => {
              setInfo(false);
            }}
          >
            hide
          </span>
        )}
        <h2>aistories? gpt-3?</h2>
        <p>basically i wanted to do something with gpt-3 (<a href="https://en.wikipedia.org/wiki/GPT-3" target="__blank">wikipedia</a> : 'a autoregressive language model that uses deep learning to produce human-like text'). aistories contains short stories writted by gpt-3, updated daily.</p>
        <h2>how does it work</h2>
        <p>in nutshell, new stories are made midnight every day in a nodejs server using openai api, and the results are stores in firebase database. code is <a href="https://github.com/ruralad/openai-story-project" target="__blank">open source</a>  btw.</p>
      </div>
    );
  }
  return (
    <div className="app" data-theme={theme}>
      {!info && (
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
      )}
      <div className="box">
        <img src={book} alt="todaysStory" />
        <p>todays story</p>
      </div>
      <div className="box">
        <img src={books} alt="allStories" />
        <p>previous stories</p>
      </div>

      {info && <InfoCard />}
    </div>
  );
}
