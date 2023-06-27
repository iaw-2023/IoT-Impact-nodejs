// orderRoutes.js
const express = require("express");
const router = express.Router();
const { getAllOrders, getOrderById, postOrder } = require("../db/queries");

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
    let bodyData = "";

    // Collect the data chunks of the request body
    req.on("data", (chunk) => {
      bodyData += chunk.toString();
    });

    // Process the complete request body
    req.on("end", async () => {
      const { customer_email, total_amount, items } = JSON.parse(bodyData);

      if (!customer_email || !total_amount || !items) {
        return res.status(400).json({ message: "Faltan campos obligatorios al hacer post de la orden" });
      }

      const orderData = { customer_email, total_amount, items };
      const newOrder = await postOrder(orderData, res);
      res.status(201).json(newOrder);
    });
  } catch (error) {
    res.status(500).json({ message: `Error al crear la orden: ${error.message}` });
  }
});





module.exports = router;
