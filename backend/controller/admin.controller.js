import { z } from "zod";
import { Admin } from "../model/admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
/** Signup routes start */
export const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const adminSchema = z.object({
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

  const validatedData = adminSchema.safeParse(req.body);
  if (!validatedData.success) {
    return res.status(404).json({
      message: "Enter correct value in each fields",
      success: false,
      errors: validatedData.error.issues.map((err) => err.message),
    });
  }
  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(404).json({
        message: "All Field Required",
        success: false,
      });
    }
    const existingUser = await Admin.findOne({ email: email });
    if (existingUser) {
      return res.status(404).json({
        message: "Admin already exist",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminData = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };
    const newAdmin = new Admin(adminData);
    await newAdmin.save();
    res.status(200).json({
      message: "Admin Register Successfully",
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
  console.log("request test", req.body);
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email: email });
    console.log("Exist data",admin);
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!admin || !isPasswordCorrect) {
      return res.status(404).json({
        message: "Invalid Credentials",
        success: false,
      });
    }

    //jwt token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_ADMIN_PASSWORD, {
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
