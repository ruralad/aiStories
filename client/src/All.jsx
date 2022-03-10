import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import "./styles/App.css";
import styles from "./styles/all.module.css";
import { db } from "./components/firebaseConfig";
import TopBar from "./components/Topbar";
import { doc, getDoc } from "firebase/firestore";

export default function All() {
  const [all, setAll] = useState("");
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  useEffect(async () => {
    const ref = doc(db, "stats", "all");
    const docSnap = await getDoc(ref);
    setAll(docSnap.data().numberOfStories);
  }, []);
  return (
    <div className="app" data-theme={theme}>
      <TopBar theme={theme} setInfo={false} setTheme={setTheme} />
      <div className={styles.stories}>
      {all &&
        [...Array(all)].map((x, i) => (
          <Link key={i} className={styles.each}
            to={{
              pathname: "/all/" + (all-i),
              state: { theme },
            }}
          >Story {all-i}</Link>
        ))}
      </div>
      
      <Link to="/" className={styles.working}>
        go back home
      </Link>
    </div>
  );
}
