import { Schema } from "mongoose";

export const TaskSchema = new Schema(
  {

  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)