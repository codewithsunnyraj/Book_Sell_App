import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import { z } from "zod";
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
