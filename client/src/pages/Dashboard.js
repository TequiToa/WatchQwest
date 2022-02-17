import React, { useContext, useEffect, useState } from "react";
import { getList } from "../api";
import Cards from "../components/Cards";
import Context from "../context/Context";
import Resume from "../components/Resume";
import Vitrine from "../components/Vitrine";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { watchlistId, isAuth } = useContext(Context);
  const navigate = useNavigate();

  const [tab, setTab] = useState([]);
  const [stats, setStats] = useState({});

  const getTab = async () => {
    const res = await getList(watchlistId);
    setStats(res.data.stats);
    setTab(res.data.animeList);
  };
  useEffect(() => {
    if (isAuth === false) {
      navigate("/");
    }
    //recuperer tab
    getTab();
    //
  }, []);

  let fakeProfile = {
    name: "TequiToa",
    xp: 17000,
  };

  return (
    <div className="dashboardContainer">
      <div className="flexColLeft">
        <Resume user={fakeProfile} stats={stats} />
        <Vitrine />
      </div>
      <div className="flexColRight">
        <>
          <h2 className="heroTitle">Anime Top 10</h2>
          <Cards tab={tab} max={tab.length} mode="vue" />
        </>
      </div>
    </div>
  );
}
export default Dashboard;
