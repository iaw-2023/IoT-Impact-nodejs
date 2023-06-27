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

const getAllOrders = async () => {
  try {
    const query = "SELECT * FROM orders";
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    const ERROR_MSG = "Error en la consulta por orders";
    console.error(ERROR_MSG, error);
    res.status(500).json({ error: ERROR_MSG });
  }
};

const getOrderById = async (id) => {
  try {
    const query = "SELECT * FROM orders WHERE id = $1";
    const { rows } = await db.query(query, [id]);
    return rows;
  } catch (error) {
    const ERROR_MSG = "Error en la consulta de la orden";
    console.error(ERROR_MSG, error);
    res.status(500).json({ error: ERROR_MSG });
  }
};

const postOrder = async (orderData, res) => {
  try {
    const query =
      "INSERT INTO orders (customer_email, total_amount) VALUES ($1, $2) RETURNING *";
    const { customer_email, total_amount } = orderData;
    const values = [customer_email, total_amount];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    const ERROR_MSG = "Error al crear el pedido";
    console.error(ERROR_MSG, error);
    res.status(500).json({ error: ERROR_MSG });
  }
};


const getAllItems = async () => {
  try {
    const query = "SELECT * FROM items";
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    const ERROR_MSG = "Error en la consulta por items";
    console.error(ERROR_MSG, error);
    res.status(500).json({ error: ERROR_MSG });
  }
};

const getItemById = async (id) => {
  try {
    const query = "SELECT * FROM items WHERE id = $1";
    const { rows } = await db.query(query, [id]);
    return rows;
  } catch (error) {
    const ERROR_MSG = "Error en la consulta del item";
    console.error(ERROR_MSG, error);
    res.status(500).json({ error: ERROR_MSG });
  }
};


module.exports = {
  getAllProducts,
  getProductById,
  getAllCategories,
  getCategoryById,
  getAllOrders,
  getOrderById,
  postOrder,
  getAllItems,
  getItemById,
};
