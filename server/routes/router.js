import express from "express";
import {
  registerUser,
  loginUser,
  getAllUser,
  patchUser,
  deleteUser,
  loginToken,
} from "../controllers/gestionUser.js";
import { updateList, getList } from "../controllers/gestionWatchlist.js";
import { authenticateToken } from "../utils/token.js";
const router = express.Router();

router.get("/", () => {
  console.log("🤖 : /// ");
});

router.patch("/updateList", updateList);
router.get("/getList", getList);

router.post("/registerUser", registerUser);

router.post("/loginUser", loginUser);
router.post("/loginToken", authenticateToken, loginToken);

//! securiser l'acces
router.get("/getAllUser", getAllUser);

router.patch("/patchUser", patchUser);

router.delete("/deleteUser", deleteUser);

export default router;
