import { Routes, Route } from "react-router-dom";
import State from "./context/State";
import Navbar from "./components/Navbar";
import { Home, Page404, Dashboard, List, AddAnime } from "./pages/";

import "./styles/base.sass";

function App() {
  return (
    <div className="AppContainer">
      <State>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/addanime" element={<AddAnime />} />
          <Route exact path="/list" element={<List />} />
          <Route exact path="/list/:username" element={<List />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </State>
    </div>
  );
}

export default App;
