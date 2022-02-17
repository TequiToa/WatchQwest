import React, { useContext, useEffect, useState } from "react";
import { getList } from "../api";
import Cards from "../components/Cards";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";

function List() {
  const { watchlistId, isAuth } = useContext(Context);
  const navigate = useNavigate();

  const [tab, setTab] = useState([]);

  const getTab = async () => {
    const res = await getList(watchlistId);

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

  return (
    <main>
      <h2>My List</h2>

      {tab !== undefined && <Cards tab={tab} max={tab.length} mode="vue" />}
    </main>
  );
}

export default List;
