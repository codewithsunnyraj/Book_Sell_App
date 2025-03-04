import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { Purchase } from "../model/purchase.model.js";
import { Course } from "../model/course.model.js";
/** Signup routes start */
export const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userSchema = z.object({
    firstName: z
      .string()
      .min(2, { message: "First name must be atleast 2 characters" }),
    lastName: z
      .string()
      .min(2, { message: "lastName must be atleast 2 char long" }),
    email: z.string().email(),
    password: z
      .string()
      .min(5, { message: "password must be atleast 5 char long" }),
  });

  const validatedData = userSchema.safeParse(req.body);
  if (!validatedData.success) {
    return res
      .status(404)
      .json({
        success: false,
        message: validatedData.error.issues.map((err) => err.message),
      });
  }
  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(404).json({
        message: "All Field Required",
        success: false,
      });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(404).json({
        message: "User already exist",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };
    const newUser = new User(userData);
    await newUser.save();
    res.status(200).json({
      message: "User Register Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Error while signup",
      success: false,
    });
  }
};
/** Signup routes end */

/* Login routes start Here */
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordCorrect) {
      return res.status(404).json({
        message: "Invalid Credentials",
        success: false,
      });
    }

    //jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      httpOnly: true, // cannot be acccess via JS Directly
      secure: process.env.NODE_ENV === "production", // true for https only
      sameSite: "Strict", // prevent from csrf attacks
    };
    res.cookie("jwt", token, cookieOptions);
    res.status(201).json({
      message: "Login Successfully",
      success: true,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Error Occur while Login",
      success: false,
    });
  }
};
/* Login routes start End */

/* logout start */
export const logout = async (req, res) => {
  try {
    if (!req.cookies.jwt) {
      return res
        .status(401)
        .json({ message: "Please Login First", success: false });
    }
    res.clearCookie("jwt");
    res.status(200).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error while Logout",
      success: false,
    });
  }
};
/* logout end */

// purchased course detail start
export const purchased = async (req, res) => {
  const userId = req.userId;
  console.log("userIIId", userId);
  try {
    const purchaseed = await Purchase.find({ userId });
    let purchasedCourseId = [];

    for (let i = 0; i < purchaseed.length; i++) {
      purchasedCourseId.push(purchaseed[i].courseId);
    }
    const courseData = await Course.find({ _id: { $in: purchasedCourseId } });
    res.status(200).json({
      message: "Display purchased data",
      success: true,
      data: purchaseed,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error while Showing purchased data",
      success: false,
      Error: error,
    });
  }
};
// purchased course detail end
