import express from "express";
import { signup, login, logout, getMe } from "../controller/authcontroller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/getme",protectRoute,getMe);


export default router;
