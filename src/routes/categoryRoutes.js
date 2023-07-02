// categoryRoutes.js
const express = require("express");
const router = express.Router();
const { getAllCategories, getCategoryById } = require("../db/queries");

router.get("/", async (req, res) => {
  const categories = await getAllCategories();
  res.json(categories);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const category = await getCategoryById(id);

  if (category.length === 0) {
    res.status(404).json({ message: "Categoria no encontrada" });
  } else {
    res.json(category[0]);
  }
});

// Ruta para obtener productos por categoría
router.get("/:idCategoria/products", async (req, res) => {
  const { idCategoria } = req.params;
  try {
    const query = "SELECT * FROM products WHERE product_category_id = $1";
    const { rows } = await db.query(query, [idCategoria]);

    res.json(rows);
  } catch (error) {
    const ERROR_MSG = "Error en la consulta de la categoria";
    console.error(ERROR_MSG, error);
    res.status(500).json({ error: ERROR_MSG });
  }
});

module.exports = router;
