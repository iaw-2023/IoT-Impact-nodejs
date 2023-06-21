const express = require("express");
const router = express.Router();
const { db } = require("../client");

router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM product_category";
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (error) {
    const ERROR_MSG = "Error en la consulta por categorias";
    console.error(ERROR_MSG, error);
    res.status(500).json({ error: ERROR_MSG });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const query = "SELECT * FROM product_category WHERE id = $1";
    const { rows } = await db.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ message: "Categoria no encontrada" });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    const ERROR_MSG = "Error en la consulta de la categoria";
    console.error(ERROR_MSG, error);
    res.status(500).json({ error: ERROR_MSG });
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
