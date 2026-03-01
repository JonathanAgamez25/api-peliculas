const express = require("express");
require("dotenv").config();
require("./config/db");

const clienteRoutes = require("./routes/clienteRoutes");
const servicioRoutes = require("./routes/servicioRoutes");
const ordenTrabajoRoutes = require("./routes/ordenTrabajoRoutes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensaje:
      "API Solar funcionando correctamente para gestión de clientes, servicios y órdenes de trabajo",
  });
});

app.use("/api/clientes", clienteRoutes);
app.use("/api/servicios", servicioRoutes);
app.use("/api/ordenes-trabajo", ordenTrabajoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
