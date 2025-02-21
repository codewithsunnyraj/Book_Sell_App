import express from "express";
import {
  createCourse,
  deleteCourse,
  updateCourse,
} from "../controller/course.controller.js";
const router = express.Router();

router.post("/create", createCourse);
router.put("/update/:courseId", updateCourse);
router.delete("/delete/:courseId", deleteCourse);

export default router;
