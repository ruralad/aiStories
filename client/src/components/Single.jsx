import styles from "../styles/today.module.css";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "use-local-storage";

import loadingAnimation from "../assets/loading.json";
import loadingAnimationLight from "../assets/loadingLight.json";
import lottie from "lottie-web/build/player/lottie_light";

import { db } from "./firebaseConfig";
import TopBar from "./Topbar";
import {
  getFirestore,
  getDocs,
  collection,
  where,
  limit,
  getDoc,
  query,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Single(props) {
  const { id } = useParams();
  document.title = "Story " + id + " | aiStories";
  const [info, setInfo] = useState(false);
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const [story, setStory] = useState({
    text: "",
    number: 0,
    loading: true,
  });
  const navigate = useNavigate();
  const goBackHome = () => {
    navigate("/");
  };

  useEffect(() => {
    async function fetchData() {
      lottie.loadAnimation({
        container: document.querySelector("#loadLight"),
        animationData: loadingAnimation,
      });
      lottie.loadAnimation({
        container: document.querySelector("#loadDark"),
        animationData: loadingAnimationLight,
      });
      const ref = collection(db, "stories");
      const q = query(
        collection(db, "stories"),
        where("number", "==", Number(id))
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setStory({
          text: doc.data().story,
          number: doc.data().number,
          loading: false,
        });
      });
    }
    fetchData();
  }, []);
  return (
    <div className={styles.app} data-theme={theme}>
      {!info && <TopBar theme={theme} setInfo={false} setTheme={setTheme} />}
      <div className={styles.storyContainer}>
        {story.loading && theme === "dark" && (
          <div id="loadLight" className={styles.loadAnimation}></div>
        )}
        {story.loading && theme === "light" && (
          <div id="loadDark" className={styles.loadAnimation}></div>
        )}
        {!story.loading && (
          <>
            <span>Story Number {story.number} </span>
            <p className={styles.story}>{story.text}</p>
            <span className={styles.goBack} onClick={goBackHome}>
              go back home
            </span>
          </>
        )}
      </div>
    </div>
  );
}
