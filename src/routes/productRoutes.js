// productRoutes.js
const express = require("express");
const router = express.Router();
const { getAllProducts, getProductById } = require("../db/queries");

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await getProductById(id);

  if (product.length === 0) {
    res.status(404).json({ message: "Producto no encontrado" });
  } else {
    res.json(product[0]);
  }
});

module.exports = router;
