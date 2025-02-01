import mongoose from "mongoose";

const AiTaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["summarization", "rephrasing", "custom-bot"],
    required: true,
  },
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const aiTask = mongoose.model("AiTask", AiTaskSchema);

export default aiTask;
