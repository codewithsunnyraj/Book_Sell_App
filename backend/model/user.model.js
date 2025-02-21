import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    require: true,
    type: String,
  },
  lastName: {
    require: true,
    type: String,
  },
  email: {
    require: true,
    type: String,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

export const User = mongoose.model("User", userSchema);
