import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "@/2_pages/Main";
import Add from "@/2_pages/Add";
import Single from "@/2_pages/Single";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/add" element={<Add />} />
        <Route path="/:id" element={<Single />} />
        <Route path="/*" element={<Main />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
