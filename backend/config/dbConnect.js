import mongoose from "mongoose";

export const DBConnect = async () => {
  const Mongo_path = process.env.MONGO_URL;
  try {
    const connect = await mongoose.connect(Mongo_path);
    console.log(`Database connected Successfully`);
  } catch (error) {
    console.log(`Error while connecting to database`, error);
  }
};
