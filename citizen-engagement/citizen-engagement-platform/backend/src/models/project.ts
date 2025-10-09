import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  status: "planned" | "in-progress" | "completed";
  createdBy: mongoose.Types.ObjectId;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["planned", "in-progress", "completed"],
      default: "planned"
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

const Project = mongoose.model<IProject>("Project", projectSchema);
export default Project;
