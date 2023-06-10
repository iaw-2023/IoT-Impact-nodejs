const express = require("express");
const router = express.Router();
const { supabase } = require("../supabaseClient");

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("product_category").select("*");
    if (error) {
      const ERROR_MSG = "Error en la consulta por categorias";
      console.error(ERROR_MSG, error);
      res.status(500).json({ error: ERROR_MSG });
    } else {
      res.json(data);
    }
  } catch (error) {
    const ERROR_MSG = "Error en la petición a la base de datos";
    console.error(ERROR_MSG, error);
    res.status(500).json({ error: ERROR_MSG });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { data, error } = await supabase
      .from("product_category")
      .select("*")
      .eq("id", id);

    if (error) {
      const ERROR_MSG = "Error en la consulta de la categoria";
      console.error(ERROR_MSG, error);
      res.status(500).json({ error: ERROR_MSG });
    } else if (data.length === 0) {
      res.status(404).json({ message: "Categoria no encontrada" });
    } else {
      res.json(data);
    }
  } catch (error) {
    const ERROR_MSG = "Error en la petición a la base de datos";
    console.error(ERROR_MSG, error);
    res.status(500).json({ error: ERROR_MSG });
  }
});

module.exports = router;
