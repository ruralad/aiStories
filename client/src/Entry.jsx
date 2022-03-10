import Today from "./Today";
import All from "./All";
import App from "./App";
import Single from "./components/Single"
import { Route, Routes } from "react-router-dom";

function Entry() {
  return (
    <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/today" element={<Today/>} />
        <Route path="/all" element={<All/>} />
        <Route path="/all/:id" element={<Single/>} />
    </Routes>
  );
}

export default Entry;
