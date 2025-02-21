import express from "express";
import { createCourse, updateCourse } from "../controller/course.controller.js";
const router = express.Router();

router.post("/create", createCourse);
router.put("/update/:courseId", updateCourse);

export default router;
