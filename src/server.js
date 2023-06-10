const express = require("express");
const cors = require("cors");
const { supabase } = require("./supabaseClient");
const app = express();


// Habilitar CORS
app.use(cors());

// Puerto en el que escucha el servidor
const port = 3000;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

// Rutas
app.use("/rest/products", require("./routes/productRoutes"));
app.use("/rest/categories", require("./routes/categoryRoutes"));


app.get("/", async (req, res) => {
  res.json({ message: "Bienvenido a la página principal" });
});
