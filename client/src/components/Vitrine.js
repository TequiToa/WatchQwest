import React, { useContext, useEffect, useState } from "react";
import { getList } from "../api";
import Context from "../context/Context";

import "../styles/vitrine.sass";
function Vitrine() {
  const { watchlistId, isAuth } = useContext(Context);
  const [tab, setTab] = useState([]);
  let [userTrophies, setUserTrophies] = useState([]);
  const getTab = async () => {
    const res = await getList(watchlistId);

    setTab(res.data.animeList);
  };

  let trophies = [
    {
      name: "nana",
      unlocked: true,
      path: "/trophies/Badge-2.png",
      description: "Tu as vu un shojo, bravo !",
      condition: "Nana",
    },
    {
      name: "shonen",
      unlocked: true,
      path: "/trophies/Badge-1.png",
      description: " 🧟‍♀️🧟‍♂️🧟‍♀️",
      condition: "Kimetsu no Yaiba",
    },
    {
      name: "thriler",
      unlocked: false,
      path: "/trophies/Badge-3.png",
      description: "Tu veux une pomme?",
      condition: "Death Note",
    },
  ];

  const makeUserTrophiesList = () => {
    console.log("test");
    tab.forEach((elem) => {
      trophies.forEach((elem2) => {
        if (elem.name === elem2.condition) {
          setUserTrophies([...userTrophies, elem2]);
        }
      });
    });
  };
  const getTrophies = () => {
    return userTrophies.map((elem) => (
      <div className="trophyCard" key={[elem]}>
        <img src={window.location.origin + elem.path} alt={elem.description} />
        <p>{elem.description}</p>
      </div>
    ));
  };

  useEffect(() => {
    //recuperer tab
    getTab();
    makeUserTrophiesList();
    //
  }, []);

  return (
    <div className="vitrineContainer">
      <div className="vitrineFlexRow">
        <div className="vitrineTitle">Vitrine</div>
        <div className="vitrineTitle droite">total : {userTrophies.length}</div>
      </div>
      <div className="vitrine">{getTrophies()}</div>
    </div>
  );
}

export default Vitrine;
