const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");

// Habilitar CORS
app.use(cors());

// Puerto en el que escucha el servidor
const port = 3000;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

// Bienvenida
app.get("/", async (req, res) => {
  res.json({ message: "Bienvenido a la página principal" });
});

// Rutas
app.use("/rest", routes);
