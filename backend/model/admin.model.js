import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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

export const Admin = mongoose.model("Admin", adminSchema);
