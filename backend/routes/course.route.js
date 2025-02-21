import express from "express";
import { createCourse } from "../controller/course.controller.js";
const router = express.Router();

router.post("/create", createCourse);

export default router;
