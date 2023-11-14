import { Schema } from "mongoose";

export const SprintSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
    startDate: { type: Date, required: true, min: new Date() },
    endDate: { type: Date, required: true, min: new Date() },
    status: { type: String, enum: ['pending', 'in-progress', 'review', 'done'], required: true, default: 'pending' },
    projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    isOpen: { type: Boolean, required: true, default: true }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)