import mongoose, { Schema } from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    due_date: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user_id: {
      ref: "user",
      type: Schema.Types.ObjectId,
      required: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("tasks", todoSchema);
