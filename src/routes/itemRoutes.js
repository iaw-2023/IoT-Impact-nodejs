// itemRoutes.js
const express = require("express");
const router = express.Router();
const { getAllItems, getItemById } = require("../db/queries");

router.get("/", async (req, res) => {
  const items = await getAllItems();
  res.json(items);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const item = await getItemById(id);

  if (item.length === 0) {
    res.status(404).json({ message: "Item no encontrado" });
  } else {
    res.json(item[0]);
  }
});

module.exports = router;
