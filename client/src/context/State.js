import React, { useReducer } from "react";

import Context from "./Context";
import Reducer from "./Reducer";

const State = (props) => {
  const initialState = {
    isAuth: false,
    avatar: {},
    searchList: [],
    watchlistId: "",
    userId: "",
    username: "",
  };

  const [state, dispatch] = useReducer(Reducer, initialState);
  const setUsername = (newusername) => {
    dispatch({
      type: "SET_USERNAME",
      newusername: newusername,
    });
  };
  const setWatchlistId = (newid) => {
    dispatch({
      type: "SET_WATCHLISTID",
      newId: newid,
    });
  };
  const setUserId = (newid) => {
    dispatch({
      type: "SET_USERID",
      newId: newid,
    });
  };
  const toggleAuth = () => {
    dispatch({
      type: "TOGGLE_AUTH",
    });
  };
  const setAvatar = (newavatar) => {
    dispatch({
      type: "SET_AVATAR",
      avatar: newavatar,
    });
  };

  const setSearchList = (newList) => {
    dispatch({
      type: "SET_SEARCHLIST",
      newList: newList,
    });
  };
  return (
    <Context.Provider
      value={{
        isAuth: state.isAuth,
        toggleAuth,
        setAvatar,
        avatar: state.avatar,
        searchList: state.searchList,
        setSearchList,
        watchlistId: state.watchlistId,
        setWatchlistId,
        userId: state.userId,
        setUserId,
        username: state.username,
        setUsername,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
