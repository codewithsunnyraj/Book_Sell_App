import mongoose from "mongoose";
import { Course } from "../model/course.model.js";
import { v2 as cloudinary } from "cloudinary";
export const createCourse = async (req, res) => {
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
  const { courseId } = req.params;

  const { title, description, price, image } = req.body;

  try {
    const course = await Course.updateOne(
      { _id: courseId },
      {
        title,
        description,
        price,
        image: {
          public_id: image?.public_id ,
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
