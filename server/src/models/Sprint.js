import { Schema } from "mongoose";

export const SprintSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
    description: { type: String, required: true, maxlength: 300 },
    status: { type: String, enum: ['pending', 'in-progress', 'review', 'done'], required: true, default: 'pending' },
    projectId: { type: Schema.Types.ObjectId, }
  }
)