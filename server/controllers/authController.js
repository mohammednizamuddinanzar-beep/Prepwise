// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name)
      return res.status(400).json({ message: 'All fields are required.' });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: 'Email already in use.' });

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      xp:    user.xp,
      level: user.level,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required.' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials.' });

    res.status(200).json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      xp:    user.xp,
      level: user.level,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password")
    if (!user) return res.status(404).json({ message: "User not found" })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { registerUser, loginUser, getUserById };
