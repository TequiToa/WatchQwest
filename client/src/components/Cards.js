import React, { useContext, useState } from "react";
import Context from "../context/Context";
import "../styles/cards.sass";

function Cards({ tab, max, mode }) {
  const { searchList, setSearchList } = useContext(Context);

  return (
    <div className="cardsView">
      {tab.length > 0 &&
        tab
          .sort((a, b) => {
            if (mode === "vue") {
              return b.userData.score - a.userData.score;
            }
            if (mode === "selected") {
              return b.score - a.score;
            }
          })
          .map((elem, index) => {
            if (mode === "selected") {
              if (index + 1 <= max) {
                return (
                  <>
                    <div
                      className={elem.selected ? "card  cardSelected" : "card"}
                      index={elem.mal_id}
                      onClick={() => {
                        let tab = searchList;
                        console.log(tab[index]);
                        tab[index] = {
                          ...tab[index],
                          selected: !tab[index].selected,
                        };

                        setSearchList(tab);
                      }}
                    >
                      <img src={elem.image_url} alt="anime-card" />
                      <div className="cardTitle">{elem.title}</div>
                      <div>{elem.score}</div>
                    </div>
                  </>
                );
              }
            }
            if (mode === "vue") {
              return (
                <>
                  <div className="card" index={elem.mal_id}>
                    <img src={elem.image_url} alt="anime-card" />
                    <div className="cardTitle">{elem.title}</div>
                    <div>{elem.userData.score}</div>
                  </div>
                </>
              );
            }
          })}
    </div>
  );
}

export default Cards;
