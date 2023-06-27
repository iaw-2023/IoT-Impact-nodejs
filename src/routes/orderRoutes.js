// orderRoutes.js
const express = require("express");
const router = express.Router();
const { getAllOrders, getOrderById } = require("../db/queries");

router.get("/", async (req, res) => {
  const orders = await getAllOrders();
  res.json(orders);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const order = await getOrderById(id);

  if (order.length === 0) {
    res.status(404).json({ message: "Orden no encontrada" });
  } else {
    res.json(order[0]);
  }
});

module.exports = router;
