const express = require("express");
const router = express.Router();
const Record = require("../models/record");

// Summary (Aggregation)
router.get("/summary", async (req, res) => {
  const result = await Record.aggregate([
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" }
      }
    }
  ]);

  let income = 0, expense = 0;

  result.forEach(r => {
    if (r._id === "income") income = r.total;
    else expense = r.total;
  });

  res.json({
    totalIncome: income,
    totalExpense: expense,
    balance: income - expense
  });
});

// Category-wise
router.get("/category", async (req, res) => {
  const result = await Record.aggregate([
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" }
      }
    }
  ]);

  res.json(result);
});

// Recent
router.get("/recent", async (req, res) => {
  const records = await Record.find()
    .sort({ createdAt: -1 })
    .limit(5);

  res.json(records);
});

module.exports = router;