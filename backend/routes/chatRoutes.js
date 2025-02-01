import express from "express";
import { sendMessage, getChatHistory } from "../controllers/chatController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const chatRouter = express.Router();

chatRouter.post("/send", authMiddleware, sendMessage);
chatRouter.get("/history", authMiddleware, getChatHistory);

export default chatRouter;
