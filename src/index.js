const express = require("express");
require("dotenv").config();
require("./config/db");

const generoRoutes = require("./routes/generoRoutes");
const directorRoutes = require("./routes/directorRoutes");
const productoraRoutes = require("./routes/productoraRoutes");
const tipoRoutes = require("./routes/tipoRoutes");
const mediaRoutes = require("./routes/mediaRoutes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensaje: "API Películas funcionando correctamente" });
});

app.use("/api/generos", generoRoutes);
app.use("/api/directores", directorRoutes);
app.use("/api/productoras", productoraRoutes);
app.use("/api/tipos", tipoRoutes);
app.use("/api/medias", mediaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
