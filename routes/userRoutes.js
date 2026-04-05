const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Create User
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Update User
router.patch("/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

module.exports = router;