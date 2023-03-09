import mongoose, { Schema } from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      default: "",
    },
    subject: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
    },
    url: {
      type: String,
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("notes", notesSchema);
