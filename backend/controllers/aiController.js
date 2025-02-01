import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import AiTask from "../models/aiTask.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const summarizeText = async (req, res) => {
  const { text } = req.body;
  const userId = req.userId;

  try {
    if (!text) {
      return res.status(400).json({ error: "Text cannot be empty" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Summarize the following text concisely, capturing the main points and key ideas:

${text}

Summary:`;

    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    // Save the task to MongoDB
    const aiTask = new AiTask({
      user: userId,
      type: "summarization",
      input: text,
      output: summary,
    });
    await aiTask.save();

    res.json({ summary });
  } catch (err) {
    console.error("Error generating summary from Gemini API:", err);
    res.status(500).json({ error: err.message });
  }
};

export const rephraseText = async (req, res) => {
  const { text } = req.body;
  const userId = req.userId;

  try {
    if (!text) {
      return res.status(400).json({ error: "Text cannot be empty" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Rephrase the following text while maintaining its original meaning and tone:

${text}

Rephrased Text:`;

    const result = await model.generateContent(prompt);
    const rephrased = result.response.text();

    // Save the task to MongoDB
    const aiTask = new AiTask({
      user: userId,
      type: "rephrasing",
      input: text,
      output: rephrased,
    });
    await aiTask.save();

    res.json({ rephrased });
  } catch (err) {
    console.error("Error rephrasing text from Gemini API:", err);
    res.status(500).json({ error: err.message });
  }
};

export const customBotQuery = async (req, res) => {
  const { query } = req.body;
  const userId = req.userId;

  try {
    if (!query) {
      return res.status(400).json({ error: "Query cannot be empty" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a helpful AI assistant. Provide a comprehensive and thoughtful response to the following query:
  
${query}
  
Response:`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Save the task to MongoDB
    const aiTask = new AiTask({
      user: userId,
      type: "custom-bot",
      input: query,
      output: response,
    });
    await aiTask.save();

    res.json({ response });
  } catch (err) {
    console.error("Error processing custom bot query:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getAITaskHistory = async (req, res) => {
  const userId = req.userId;
  try {
    const tasks = await AiTask.find({ user: userId }).sort({ timestamp: -1 });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching AI task history:", err);
    res.status(500).json({ error: err.message });
  }
};
