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
  const id = req.params.id;
  try {
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

// Ruta para obtener productos por categoría
router.get("/:idCategoria/products", async (req, res) => {
  const { idCategoria } = req.params;
  try {
    // Consultar los productos de la categoría específica
    const { data, error } = await supabase
      .from("products")
      .select()
      .eq("product_category_id", idCategoria);

    if (error) {
      const ERROR_MSG = "Error en la consulta de la categoria";
      console.error(ERROR_MSG, error);
      res.status(500).json({ error: ERROR_MSG });
      throw error
    }

    res.json(data);
  } catch (error) {
    const ERROR_MSG = "Error en la petición a la base de datos";
    console.error(ERROR_MSG, error);
    res.status(500).json({ error: ERROR_MSG });
  }
});





module.exports = router;
