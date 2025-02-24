import mongoose from "mongoose";
import { Course } from "../model/course.model.js";
import { v2 as cloudinary } from "cloudinary";
import { Purchase } from "../model/purchase.model.js";
export const createCourse = async (req, res) => {
  const adminId = req.adminId;
  const { title, description, price } = req.body;
  try {
    if (!title || !description || !price) {
      res.status(404).json({
        message: "All Field Required",
        success: false,
      });
    }

    const { image } = req.files;
    console.log("image found", image);

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        message: "No Image file Uploaded",
        success: false,
      });
    }

    /** Image format Allowed start */
    const allowedFormat = ["image/png", "image/jpeg"];
    if (!allowedFormat.includes(image.mimetype)) {
      return res.status(404).json({
        messsage: "Invalid File format. Only png & jpg allowed",
        success: false,
      });
    }
    /** Image format Allowed end */

    // cloudnary Code
    const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
    console.log("cloud", cloud_response);
    if (!cloud_response || cloud_response.error) {
      return res.status(404).json({
        message: "Error while uploading files",
        success: false,
      });
    }

    const courseData = {
      title,
      description,
      price,
      image: {
        public_id: cloud_response.public_id,
        url: cloud_response.url,
      },
      creatorId: adminId,
    };

    const course = await Course.create(courseData);
    res.status(200).json({
      message: "Course created successfully",
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while Create Courses",
      success: false,
      Error: error,
    });
  }
};

/** Update course start */
export const updateCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;

  const { title, description, price, image } = req.body;

  try {
    const courseSearch = await Course.findById(courseId);
    if (!courseSearch) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }
    const course = await Course.updateOne(
      { _id: courseId, creatorId: adminId },
      {
        title,
        description,
        price,
        image: {
          public_id: image?.public_id,
          url: image?.url,
        },
      }
    );
    console.log(course);
    res.status(200).json({
      message: "Updated Course Successfully",
      success: true,
      data: course,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Error while Updating data",
      Error: error,
      success: false,
    });
  }
};
/** Update course end */

/** Delete course section start */
export const deleteCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;
  try {
    const course = await Course.findOneAndDelete({
      _id: courseId,
      creatorId: adminId,
    });
    if (!course) {
      return res
        .status(404)
        .json({ message: "Course Not Found", success: false });
    }
    res.status(200).json({
      message: "Course Deleted Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Error while deleting course",
      success: false,
    });
  }
};
/** Delete course section end */

/** Get all courses start */
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({
      message: "Get All Courses",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      messsage: "Error Occur while Accessing all courses",
      success: false,
      Error: error,
    });
  }
};
/** Get all courses end */

/** get particular courses details start */
export const courseDetails = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not Found",
        success: false,
      });
    }

    res.status(200).json({
      message: "course details Found",
      success: true,
      data: course,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Error while accessing particular course details",
      success: false,
    });
  }
};
/** get particular courses details end */

/** Buy Courses start */
export const buyCourses = async (req, res) => {
  const { userId } = req;

  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        messsage: "Course not found",
        success: false,
      });
    }
    const existingPurchase = await Purchase.findOne({ userId, courseId });
    if (existingPurchase) {
      return res
        .status(400)
        .json({ error: "User has already purchased this course" });
    }
    const newPurchase = new Purchase({ userId, courseId });
    await newPurchase.save();
    res.status(200).json({
      messsage: "Course Purchase successfully",
      success: true,
      data: newPurchase,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Error Occur in course buying",
      success: false,
    });
  }
};
/** Buy Courses end */
