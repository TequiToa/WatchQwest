import userModel from "../models/userModel.js";
import watchlistModel from "../models/watchlistModel.js";
import { compareHash, hashage } from "../utils/hash.js";
import { generateToken } from "../utils/token.js";
//register -- create user
//?  Permet d'enregistrer un user dans la bdd.
export const registerUser = async (req, res) => {
  try {
    const { userData } = req.body;
    console.table(userData);

    //sécuriser les données

    //vérifié si user existe deja
    const isUsernamefind = await userModel.findOne({
      username: userData.username,
    });

    if (isUsernamefind !== null) {
      throw new Error("Identifiant déja utilisé");
    }

    //hashage du mdp
    const mdp = await hashage(userData.password, process.env.SALT);

    //nouvelle List
    const newList = new watchlistModel({
      stats: { days: 0, scores: 0, totalAnime: 0 },
      animeList: [],
    });

    //enregistrer et recup id
    const creationList = await newList.save();
    const creationListId = creationList._id.toString();
    console.log("test", creationList);
    //user
    const newUser = new userModel({
      ...userData,
      password: mdp,
      watchlistId: creationListId,
    });

    //Ajout a la bdd
    const creation = await newUser.save();
    console.log(creation);

    res.status(201).json({
      status: "Success",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "Error",
      error: error.message,
    });
  }
};

//login -- read user
//?  Permet d'authentifier un user apres vérification dans la bdd.
export const loginUser = async (req, res) => {
  try {
    const { userData } = req.body;

    //sécuriser les données

    //Chercher username
    const userFound = await userModel.findOne({
      username: userData.username,
    });

    if (!userFound) throw new Error("Utilisateur introuvable");

    //Comparer Hash et mdp
    if ((await compareHash(userData.password, userFound.password)) === false) {
      throw new Error("Mot de passe incorrect");
    }

    //generer token
    const token = generateToken(userFound._id.toString(), { expiresIn: "1h" });
    //console.log(userFound);
    res.status(200).json({
      status: "Success",
      auth: true,
      token: token,
      username: userFound.username,
      userId: userFound._id.toString(),
      avatar: userFound.avatar,
      watchlistId: userFound.watchlistId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      error: error.message,
      auth: false,
    });
  }
};
export const loginToken = async (req, res) => {};

//getAllUser-- read user
//?  Permet de récupérer un json avec tout les user dans la bdd.
export const getAllUser = async (req, res) => {
  try {
    let usersFind = await userModel.find({});

    const users = [];

    usersFind.forEach((elem) => {
      resTab.push({
        username: elem.username,
        password: elem.password,
        email: res.email,
      });
    });

    res.status(201).json({
      status: "Success",
      users: users,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "Error",
      error: error.message,
    });
  }
};

//patch -- update user
//?  Permet de modifier des propriétées d'un user dans la bdd.
export const patchUser = async (req, res) => {
  try {
    const { newUserData, userData } = req.body;

    //si psw alors on le hash
    if (newUserData.password !== undefined) {
      console.log(newUserData.password);
      const salt = process.env.SALT;
      newUserData.password = await hasher(newUserData.password, salt);
      console.log(newUserData.password);
    }

    //update de l'user avec nouvelles données
    const doc = await userModel.findOneAndUpdate(
      { username: userData.username, email: userData.email },
      data, //update
      { new: true }
    );

    res.status(201).json({
      status: "Success",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "Error",
      error: error.message,
    });
  }
};

//delete --delete user
//?  Permet de supprimer un user dans la bdd.
export const deleteUser = async (req, res) => {
  try {
    const { username } = req.query;

    const operationReturn = await userModel.deleteOne({
      username: username,
    });

    res.status(201).json({
      status: "Success",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "Error",
      error: error.message,
    });
  }
};
