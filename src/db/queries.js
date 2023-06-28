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
    const { customer_email, total_amount, items } = orderData;

    const orderQuery =
      "INSERT INTO orders (customer_email, total_amount) VALUES ($1, $2) RETURNING *";
    const orderValues = [customer_email, total_amount];
    const orderResult = await db.query(orderQuery, orderValues);
    const orderId = orderResult.rows[0].id;

    const itemQuery =
      "INSERT INTO items (order_id, product_id, quantity, individual_price) VALUES ($1, $2, $3, $4)";
    const itemValues = items.map((item) => [
      orderId,
      item.product_id,
      item.quantity,
      item.individual_price,
    ]);
    await db.query(itemQuery, itemValues);

    return orderResult.rows[0];
  } catch (error) {
    let errorMessage = "Error al crear el pedido";

    if (error.constraint === "orders_customer_email_check") {
      errorMessage = "El formato del correo electrónico del cliente es inválido";
    } else if (error.constraint === "items_order_id_fkey") {
      errorMessage = "El ID de orden proporcionado no existe";
    } else if (error.code === "23502") {
      errorMessage = "Faltan campos obligatorios en los elementos de la orden";
    } else {
      console.error(errorMessage, error);
    }

    res.status(500).json({ error: errorMessage });
    throw new Error(errorMessage);
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

const getAllUsers = async () => {
  try {
    const query = 'SELECT * FROM "usersReact"';
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    const ERROR_MSG = "Error en la consulta por usuarios";
    console.error(ERROR_MSG, error);
    res.status(500).json({ error: ERROR_MSG });
  }
};

const getUserByEmail = async (email) => {
  try {
    const query = 'SELECT * FROM "usersReact" WHERE email = $1';
    const { rows } = await db.query(query, [email]);
    return rows;
  } catch (error) {
    const ERROR_MSG = "Error en la consulta del usuario";
    console.error(ERROR_MSG, error);
    res.status(500).json({ error: ERROR_MSG });
  }
};

const updateOrderWithMP = async (email) => {
  try {
    const query = `
      UPDATE orders
      SET efectivo = false 
      WHERE customer_email = $1
        AND created_at = (
          SELECT created_at
          FROM orders
          WHERE customer_email = $1
          ORDER BY created_at DESC
          LIMIT 1
        )`;
    await db.query(query, [email]);
    return true;
  } catch (error) {
    const ERROR_MSG = "Error al actualizar la orden";
    console.error(ERROR_MSG, error);
    return false;
  }
}



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
  getAllUsers,
  getUserByEmail,
  updateOrderWithMP,
};
