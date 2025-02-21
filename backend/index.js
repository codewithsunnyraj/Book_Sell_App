import express from "express";
import dotenv from "dotenv";
import { DBConnect } from "./config/dbConnect.js";
dotenv.config();
import courseRoute from "./routes/course.route.js";
import userRoute from "./routes/user.route.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
const app = express();
app.use(express.json());

/* File upload code start */
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
/* File upload code end */
const Port = process.env.PORT || 5000;

app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user", userRoute);

// Configuration
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

app.listen(Port, () => {
  DBConnect();
  console.log(`server is running at ${Port}`);
});
