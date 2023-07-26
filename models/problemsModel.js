import mongoose from "mongoose";

const ProblemsSchema = mongoose.Schema({
  name: { type: String, required: true },
  statement: { type: String, required: true },
  examples: [{ input: String, output: String, explanation: String }],
  constraints: [String],
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
  author: { type: mongoose.Types.ObjectId, ref: "users" },
},{
    timestamps:true
});

export const ProblemsModel = mongoose.model("problems", ProblemsSchema);
