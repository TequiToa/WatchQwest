import React from "react";
import Auth from "../components/Auth";

function Home() {
  return (
    <main className="container">
      <div className="HomeLeft">
        <Auth />
      </div>
      <div className="HomeRight"></div>
    </main>
  );
}

export default Home;
