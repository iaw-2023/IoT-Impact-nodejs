const express = require("express");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const app = express();

// Puerto en el que escucha el servidor
const port = 3000;

// Iniciar el servidor
app.listen(port, () => {
	console.log(`Servidor iniciado en el puerto ${port}`);
});

// Ruta para obtener todos los productos
app.get("/rest/products/", async (req, res) => {
	try {
		const { data, error } = await supabase.from("products").select("*");
		if (error) {
			const ERROR_MSG = "Error en la consulta por productos";
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

// Ruta para obtener un producto específico por ID
app.get("/rest/products/:id", async (req, res) => {
	try {
		const id = req.params.id; // Obtener el ID del producto de los parámetros de la ruta
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.eq("id", id);

		if (error) {
			const ERROR_MSG = "Error en la consulta del producto";
			console.error(ERROR_MSG, error);
			res.status(500).json({ error: ERROR_MSG });
		} else if (data.length === 0) {
			res.status(404).json({ message: "Producto no encontrado" });
		} else {
			res.json(data);
		}
	} catch (error) {
		const ERROR_MSG = "Error en la petición a la base de datos";
		console.error(ERROR_MSG, error);
		res.status(500).json({ error: ERROR_MSG });
	}
});



// Ruta para obtener todas las categorias
app.get("/rest/categories/", async (req, res) => {
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


// Ruta para obtener una categoria específica por ID
app.get("/rest/categories/:id", async (req, res) => {
	try {
		const id = req.params.id; // Obtener el ID del producto de los parámetros de la ruta
		const { data, error } = await supabase
			.from("product_category")
			.select("*")
			.eq("id", id);

		if (error) {
			const ERROR_MSG = "Error en la consulta de la categoria";
			console.error(ERROR_MSG, error);
			res.status(500).json({ error: ERROR_MSG });
		} else if (data.length === 0) {
			res.status(404).json({ message: "Categoria no encontrado" });
		} else {
			res.json(data);
		}
	} catch (error) {
		const ERROR_MSG = "Error en la petición a la base de datos";
		console.error(ERROR_MSG, error);
		res.status(500).json({ error: ERROR_MSG });
	}
});