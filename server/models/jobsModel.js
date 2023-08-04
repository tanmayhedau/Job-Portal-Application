import mongoose from "mongoose";

const josbSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
    },
    position: {
      type: String,
      required: [true, "Jobs Position is required"],
      minlength: 10,
    },
    status: {
      type: String,
      enum: ["pending", "reject", "interview"],
      default: "pending",
    },
    workType: {
      type: String,
      enum: ["part-time", "full-time", "internship", "contract"],
      default: "full-time",
    },
    workLocation: {
      type: String,
      default: "Nagpur",
      required: [true, "Work location is required"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", josbSchema);
