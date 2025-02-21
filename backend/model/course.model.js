import mongoose from "mongoose";

const courseSchena = new mongoose.Schema({
  title: {
    require: true,
    type: String,
  },
  description: {
    require: true,
    type: String,
  },
  price: {
    require: true,
    type: Number,
  },
  image: {
    public_id: {
      require: true,
      type: String,
    },
    url: {
      require: true,
      type: String,
    },
  },
});

export const Course = mongoose.model("Course", courseSchena);
