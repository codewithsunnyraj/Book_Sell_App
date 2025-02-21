import express from "express";
import { login, signUp } from "../controller/user.controller.js";
const router = express.Router();

router.post("/signup", signUp);
router.get("/login", login);

export default router;
