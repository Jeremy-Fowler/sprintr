import { Schema } from "mongoose";

export const ProjectSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 45 },
    description: { type: String, required: true, maxlength: 300 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

ProjectSchema.virtual('creator',
  {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
  }
)