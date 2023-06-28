// orderRoutes.js
const express = require("express");
const router = express.Router();
const { getAllOrders, getOrderById, postOrder } = require("../db/queries");
const { db } = require("../db/connection");

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

//Lo hice asi feo tendria que ir en queries pero no llego con el tiempo jeje
router.post("/", async (req, res) => {
  try {
    
    const orderQuery = 'INSERT INTO orders (customer_email, total_amount) VALUES ($1, $2, $3) RETURNING id';
    const orderValues = [req.body.customer_email, req.body.total_amount, req.body.efectivo];
    const orderResult = await db.query(orderQuery, orderValues);
    const orderId = orderResult.rows[0].id;

    // Create the items
    const items = req.body.items;
    for (const itemData of items) {
      const itemQuery =
        'INSERT INTO items (order_id, product_id, quantity, individual_price) VALUES ($1, $2, $3, $4)';
      const itemValues = [
        orderId,
        itemData.product_id,
        itemData.quantity,
        itemData.individual_price,
      ];
      await db.query(itemQuery, itemValues);
    }


    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    throw error;
  }

});




module.exports = router;
