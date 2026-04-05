const express = require("express");
const router = express.Router();
const Record = require("../models/record");
const auth = require("../middleware/auth");

// Create Record
router.post("/", auth("admin"), async (req, res) => {
  try {
    const { amount, type, category } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({ error: "Invalid type" });
    }

    if (!category) {
      return res.status(400).json({ error: "Category required" });
    }

    const record = await Record.create(req.body);
    res.status(201).json(record);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Records with Pagination + Filter
router.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 5, type, category } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let filter = {};
    if (type) filter.type = type;
    if (category) filter.category = category;

    const records = await Record.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Record.countDocuments(filter);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      data: records
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put("/:id", auth("admin"), async (req, res) => {
  const record = await Record.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(record);
});

// Delete
router.delete("/:id", auth("admin"), async (req, res) => {
  await Record.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;