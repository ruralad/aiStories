import styles from "../styles/today.module.css";
import { useNavigate } from "react-router-dom";
import loadingAnimation from "../assets/loading.json";
import loadingAnimationLight from "../assets/loadingLight.json";
import lottie from "lottie-web/build/player/lottie_light";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyA-kAa27PF2pr8rL8zVbkGbNVwutxGSPyY",
  authDomain: "openai-ruralad.firebaseapp.com",
  projectId: "openai-ruralad",
  storageBucket: "openai-ruralad.appspot.com",
  messagingSenderId: "870147816704",
  appId: "1:870147816704:web:492dbe6233a82a892c07e5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default function TodayStory(props) {
  const theme = props.theme;
  const [story, setStory] = useState({
    text: "",
    number: 0,
    loading: true,
  });
  const navigate = useNavigate();
  const goBackHome = () => {
    navigate("/");
  };
  useEffect(async () => {
    const citiesRef = collection(db, "stories");
    const q = query(
      citiesRef,
      where("number", ">", 0),
      orderBy("number", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setStory({
        text: doc.data().story,
        number: doc.data().number,
        loading: false,
      });
    });
  }, []);
  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#loadLight"),
      animationData: loadingAnimation,
    });
    lottie.loadAnimation({
      container: document.querySelector("#loadDark"),
      animationData: loadingAnimationLight,
    });
  }, []);
  return (
    <>
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
    </>
  );
}
