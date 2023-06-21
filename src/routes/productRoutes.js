const express = require("express");
const router = express.Router();
const { db } = require("../client");

router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM products";
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (error) {
    const ERROR_MSG = "Error en la consulta por productos";
    console.error(ERROR_MSG, error);
    res.status(500).json({ error: ERROR_MSG });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM products WHERE id = $1";
    const { rows } = await db.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ message: "Producto no encontrado" });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    const ERROR_MSG = "Error en la consulta del producto";
    console.error(ERROR_MSG, error);
    res.status(500).json({ error: ERROR_MSG });
  }
});

module.exports = router;
