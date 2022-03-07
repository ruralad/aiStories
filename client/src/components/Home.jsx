import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import lottie from "lottie-web/build/player/lottie_light";
import bookAnimation from "../assets/bookOpening.json"
import libraryAnimation from "../assets/library.json"

import book from "../assets/book.png";
import books from "../assets/books.png";

export default function Home(props) {
  const { info, setInfo } = props;
  const [previousStories, setPreviousStories] = useState(false);

  const navigate = useNavigate();
  const switchPreviousStories = () => {
    setPreviousStories(true);
    setTimeout(() => {
      setPreviousStories(false);
    }, 2000);
  };
  useEffect(()=>{
    lottie.loadAnimation({
      container : document.querySelector("#animation"),
      animationData : bookAnimation,
    })
    lottie.loadAnimation({
      container : document.querySelector("#animation2"),
      animationData : libraryAnimation,
    })
  },[])
  return (
    <>
      <div className="boxes">
        <div className="box" onClick={() => navigate("/today")}>
        <div id="animation" className="animationStyle"></div>
          <p>today's story</p>
        </div>
        <div className="box" onClick={switchPreviousStories}>
          {/* <img src={books} alt="allStories" /> */}
          <div id="animation2" className="animationStyle"></div>
          <p>previous stories</p>
        </div>
      </div>

      {info && <InfoCard setInfo={setInfo} />}
      {previousStories && (
        <div className="snackbar">
          <p>still working on it</p>
        </div>
      )}
    </>
  );
}
function InfoCard(props) {
  return (
    <div className="infoCard">
      <span
        className="hideButton"
        onClick={() => {
          props.setInfo(false);
        }}
      >
        hide
      </span>
      <h2>aistories? gpt-3?</h2>
      <p>
        basically i wanted to do something with gpt-3 (
        <a href="https://en.wikipedia.org/wiki/GPT-3" target="__blank">
          wikipedia
        </a>{" "}
        : 'a autoregressive language model that uses deep learning to produce
        human-like text'). aistories contains short stories writted by gpt-3,
        updated daily.
      </p>
      <h2>how does it work</h2>
      <p>
        in a nutshell, new stories are made midnight every day in a nodejs
        server using openai api, and the results are stores in firebase
        database. code is{" "}
        <a
          href="https://github.com/ruralad/openai-story-project"
          target="__blank"
        >
          open source
        </a>{" "}
        btw.
      </p>
    </div>
  );
}
