import express from "express";
import {
  courseDetails,
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../controller/course.controller.js";
const router = express.Router();

router.post("/create", createCourse);
router.put("/update/:courseId", updateCourse);
router.delete("/delete/:courseId", deleteCourse);
router.get("/Courses", getCourses);
router.get("/:courseId", courseDetails);

export default router;
