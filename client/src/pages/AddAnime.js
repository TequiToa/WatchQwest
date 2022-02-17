import React, { useContext, useEffect, useState } from "react";
import Context from "../context/Context";
import { RiAddFill, RiDeleteBin2Line, RiSearchEyeLine } from "react-icons/ri";
import { getList, searchOne, updateList } from "../api";
import Cards from "../components/Cards";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddAnime() {
  const { searchList, setSearchList, watchlistId, isAuth } =
    useContext(Context);
  const [deleteMode, setDeleteMode] = useState(false);

  const [searchRequest, setSearchRequest] = useState("");
  const navigate = useNavigate();

  const searchSubmit = async (event) => {
    event.preventDefault();

    const res = await searchOne(searchRequest.replace(" ", "_"));

    let tab = [];
    res.data.results.forEach((elem) => {
      let { mal_id, image_url, episodes, title, score } = elem;
      let newAnime = {
        mal_id,
        image_url,
        episodes,
        title,
        score,
        selected: false,
        userData: { progress: 0, score: 0 },
      };
      tab.push(newAnime);
    });
    console.log(tab);
    setSearchList(tab);
    console.log(searchList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //filtrer
    let selectTab = searchList.filter((elem) => elem.selected === true);
    //faire oldlist+selectTab
    const old = await getList(watchlistId);
    let oldTab = old.data.animeList;

    let newList = [];
    if (deleteMode === true) {
      console.log(deleteMode);
      oldTab.forEach((elem) => {
        //tester si dans selected
        selectTab.forEach((elem2) => {
          if (elem.mal_id === elem2.mal_id) {
            oldTab = oldTab.filter((elem3) => elem3.mal_id !== elem.mal_id);
          }
        });
      });
      newList = oldTab;
    }

    if (deleteMode === false) {
      console.log(deleteMode);
      selectTab.forEach((elem) => {
        oldTab.forEach((elem2) => {
          if (elem.mal_id === elem2.mal_id) {
            oldTab = oldTab.filter((elem3) => elem3.mal_id !== elem.mal_id);
          }
        });
      });
      newList = oldTab.concat(selectTab);
    }

    console.log(newList);

    //envoyer requete
    const res = await updateList(watchlistId, newList);

    if (res !== "Error") {
      toast.success("WatchList Updated !", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    //reinit state
  };
  const handleInputChange = ({ target }, index) => {
    //recup tab
    let tab = searchList;
    //mettre a jour elem.userData
    tab[index] = {
      ...tab[index],
      userData: { ...tab[index].userData, [target.name]: target.value },
    };
    console.log(tab);
    setSearchList(tab);
  };

  useEffect(() => {
    if (isAuth === false) {
      navigate("/");
    }
  }, []);
  return (
    <main className="addAnimeContainer">
      <h2>Add Anime</h2>

      <form onSubmit={(event) => searchSubmit(event)}>
        <label htmlFor="search">Search</label>
        <input
          id="search"
          name="search"
          placeholder="search anime here ..."
          value={searchRequest}
          onChange={(event) => setSearchRequest(event.target.value)}
        />

        <button className="btnPrimarySmall">
          <RiSearchEyeLine /> Search
        </button>
      </form>
      <Cards tab={searchList} max={10} mode="selected" />
      <form onSubmit={(event) => handleSubmit(event)}>
        {searchList.map((elem, index) => {
          if (elem.selected) {
            return (
              <>
                <div>title : {elem.title}</div>
                <label htmlFor="progress">Progress :</label>
                <input
                  type="number"
                  id="progress"
                  name="progress"
                  value={elem.userData.progress}
                  onChange={(event) => handleInputChange(event, index)}
                />
                / {elem.episodes}
                <br />
                <label htmlFor="score">Score :</label>
                <input
                  type="number"
                  id="score"
                  name="score"
                  value={elem.userData.score}
                  onChange={(event) => handleInputChange(event, index)}
                />
                / 10
              </>
            );
          }
        })}

        <button
          className="btnPrimarySmall"
          onClick={() => setDeleteMode(false)}
        >
          <RiAddFill />
          Add
        </button>

        <button className="btnPrimarySmall" onClick={() => setDeleteMode(true)}>
          <RiDeleteBin2Line />
          delete
        </button>
      </form>
      <ToastContainer />
    </main>
  );
}

export default AddAnime;
