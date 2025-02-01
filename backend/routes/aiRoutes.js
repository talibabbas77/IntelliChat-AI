import express from "express";
import {
  summarizeText,
  rephraseText,
  getAITaskHistory,
  customBotQuery,
} from "../controllers/aiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const aiRouter = express.Router();

aiRouter.post("/summarize", authMiddleware, summarizeText);
aiRouter.post("/rephrase", authMiddleware, rephraseText);
aiRouter.get("/history", authMiddleware, getAITaskHistory);
aiRouter.post("/custom-bot", authMiddleware, customBotQuery);

export default aiRouter;
