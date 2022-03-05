import Today from "./Today";
import App from "./App";
import { Route, Routes } from "react-router-dom";
// import {app} from "./components/firebaseConfig"

function Entry() {
  return (
    <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/today" element={<Today/>} />
    </Routes>
  );
}

export default Entry;
