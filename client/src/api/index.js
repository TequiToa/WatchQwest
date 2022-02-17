import axios from "axios";
const serverUrl = "http://localhost:5000"; // a deplacer dans un dotenv
const animeApi = "https://api.jikan.moe/v3/search/anime?q=";

export const updateList = async (listId, listData) => {
  try {
    const res = await axios.patch(
      serverUrl + "/updateList",
      { listId, listData },
      { "Content-Type": "application/json" }
    );

    console.log("✅ List Updated ", res);
    return res;
  } catch (error) {
    console.error("❌ update issue ", error);
    return "Error";
  }
};

export const getList = async (listId) => {
  try {
    const res = await axios.get(serverUrl + "/getList", {
      params: { listId },
    });

    console.log("✅ Get List ", res);
    return res;
  } catch (error) {
    console.error("❌ Get issue", error);
    return "Error";
  }
};
export const register = async (userData) => {
  try {
    const res = await axios.post(
      serverUrl + "/registerUser",
      { userData: userData },
      { "Content-Type": "application/json" }
    );

    console.log("✅ Creation d'un nouvel user ! ");
    return res.data.status;
  } catch (error) {
    console.error("❌ Probleme lors de creation du compte: ", error);
    return "Error";
  }
};

export const login = async (userData) => {
  try {
    const res = await axios.post(
      serverUrl + "/loginUser",
      { userData: userData },
      { "Content-Type": "application/json" }
    );

    console.log("🧔 utilasateur authentifié : ", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Probleme lors de l'authentification du compte: ", error);
    return "Error";
  }
};

export const searchOne = async (search) => {
  try {
    const res = await axios.get(
      animeApi + search + "&order_by=title&limit=10",

      { "Content-Type": "application/json" }
    );

    console.log("search : ", res);
    return res;
  } catch (error) {
    console.error("❌ not find ", error);
    return "Error";
  }
};
