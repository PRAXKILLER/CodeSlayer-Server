import mongoose from "mongoose";

const SolutionsSchema = mongoose.Schema({
  problem: { type: mongoose.Types.ObjectId, ref: "problems" },
  verdict: { type: String, enum: ["Pass", "Fail"] },
  message: { type: String },
  submittedAt: Date,
  submittedBy: { type: mongoose.Types.ObjectId, ref: "users" },
});

export const SolutionsModel = mongoose.model("solutions", SolutionsSchema);
