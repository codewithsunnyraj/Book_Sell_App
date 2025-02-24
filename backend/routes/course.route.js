import express from "express";
import {
  buyCourses,
  courseDetails,
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../controller/course.controller.js";
import userMiddleware from "../middleware/user.auth.js";
import adminMiddleware from "../middleware/admin.mid.js";
const router = express.Router();

router.post("/create", adminMiddleware, createCourse);
router.put("/update/:courseId", adminMiddleware, updateCourse);
router.delete("/delete/:courseId", adminMiddleware, deleteCourse);
router.get("/Courses", getCourses);
router.get("/:courseId", courseDetails);
router.post("/buy/:courseId", userMiddleware, buyCourses);

export default router;
