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

router.post("/", async (req, res) => {
  try {
    const { customer_email, total_amount } = req.body;

    if (!customer_email || !total_amount) {
      return res.status(400).json({ message: "Faltan campos obligatorios al hacer post de la orden" });
    }

    await postItem({ customer_email, total_amount }, res);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la orden" });
  }
});


module.exports = router;
