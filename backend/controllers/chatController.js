import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import Chat from "../models/Chat.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const sendMessage = async (req, res) => {
  const { message } = req.body;
  const userId = req.userId;

  try {
    if (!message) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    // Set up streaming response
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content with streaming
    const result = await model.generateContent(message);
    const response = result.response.text();

    // Split the response into words and send them one by one
    const words = response.split(" ");
    let fullResponse = "";

    for (const word of words) {
      // Add the word to the full response
      fullResponse += word + " ";

      // Send the word with a space
      res.write(word + " ");

      // Add a small delay between words (50ms)
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    // Save the complete chat to MongoDB
    const chat = new Chat({
      user: userId,
      message,
      response: fullResponse.trim(),
    });
    await chat.save();

    // End the response stream
    res.end();
  } catch (err) {
    console.error("Error generating response from Gemini API:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getChatHistory = async (req, res) => {
  const userId = req.userId;
  try {
    const chats = await Chat.find({ user: userId }).sort({ timestamp: -1 });
    res.json(chats);
  } catch (err) {
    console.error("Error fetching chat history:", err);
    res.status(500).json({ error: err.message });
  }
};
