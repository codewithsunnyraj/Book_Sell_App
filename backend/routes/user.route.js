import express from "express";
import { login, logout, purchased, signUp } from "../controller/user.controller.js";
import userMiddleware from "../middleware/user.auth.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);
router.get("/purchases",userMiddleware, purchased);
export default router;
