// queries.js
const { db } = require("./connection");

const getAllProducts = async () => {
  try {
    const query = "SELECT * FROM products";
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    const ERROR_MSG = "Error en la consulta por productos";
    console.error(ERROR_MSG, error);
    res.status(500).json({ error: ERROR_MSG });
  }
};

const getProductById = async (id) => {
  try {
    const query = "SELECT * FROM products WHERE id = $1";
    const { rows } = await db.query(query, [id]);
    return rows;
  } catch (error) {
    const ERROR_MSG = "Error en la consulta del producto";
    console.error(ERROR_MSG, error);
    res.status(500).json({ error: ERROR_MSG });
  }
};

const getAllCategories = async () => {
  try {
    const query = "SELECT * FROM product_category";
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    const ERROR_MSG = "Error en la consulta por categorias";
    console.error(ERROR_MSG, error);
    res.status(500).json({ error: ERROR_MSG });
  }
};

const getCategoryById = async (id) => {
  try {
    const query = "SELECT * FROM product_category WHERE id = $1";
    const { rows } = await db.query(query, [id]);
    return rows;
  } catch (error) {
    const ERROR_MSG = "Error en la consulta de la categoria";
    console.error(ERROR_MSG, error);
    res.status(500).json({ error: ERROR_MSG });
  }
};


module.exports = {
  getAllProducts,
  getProductById,
  getAllCategories,
  getCategoryById,
};
