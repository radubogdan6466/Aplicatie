import express from "express";

import {
  createAngajat,
  updateAngajat,
  deleteAngajat,
  getAngajat,
  getAllAngajati,
} from "../controller/angajat-controller.js";

import {
  loginUser,
  singupUser,
  logoutUser,
} from "../controller/user-controller.js";
import {
  authenticateToken,
  createNewToken,
} from "../controller/jwt-controller.js";
import {
  createTichet,
  deleteTichet,
  getTichet,
  getAllTichete,
  updateTichet,
} from "../controller/tichet-controller.js";
const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", singupUser);
router.post("/logout", logoutUser);

router.post("/token", createNewToken);

router.post("/create", authenticateToken, createAngajat);
router.put("/update/:id", authenticateToken, updateAngajat);
router.delete("/delete/:id", authenticateToken, deleteAngajat);
router.get("/post/:id", authenticateToken, getAngajat);
router.get("/posts", authenticateToken, getAllAngajati);

router.post("/inregistrare-tichet", authenticateToken, createTichet);
router.get("/vizualizare-tichete", authenticateToken, getAllTichete);
router.delete(
  "/vizualizare-tichete/delete/:id",
  authenticateToken,
  deleteTichet
);
router.put(
  "/vizualizare-tichete/tichet/actualizare/:id",
  authenticateToken,
  updateTichet
);
router.get("/vizualizare-tichete/tichet/:id", authenticateToken, getTichet);
export default router;
