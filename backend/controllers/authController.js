import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Register a new user
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Create a new user
    const user = new User({ username, email, password });
    await user.save();

    // Generate a JWT token after the user is created
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send the token in the response
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
