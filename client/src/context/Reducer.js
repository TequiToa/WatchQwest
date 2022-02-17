export const Reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_AUTH":
      return {
        ...state,
        isAuth: !state.isAuth,
      };
    case "SET_AVATAR":
      return { ...state, avatar: action.avatar };
    case "SET_SEARCHLIST":
      return { ...state, searchList: action.newList };
    case "SET_WATCHLISTID":
      return { ...state, watchlistId: action.newId };
    case "SET_USERID":
      return { ...state, userId: action.newId };
    case "SET_USERNAME":
      return { ...state, username: action.newusername };
    default:
      return state;
  }
};
export default Reducer;
